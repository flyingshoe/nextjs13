import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Add, Close, Delete, Save } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function JobModal({ jobQuery, setJobQuery }, ref) {
  const [open, setOpen] = useState(false);
  const [job, setJob] = useState(jobQuery);

  useImperativeHandle(ref, () => ({
    handleOpen: () => {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  function modifyJob(id, key, val) {
    const tempQuery = [...job]; // Clone job query
    const idx = tempQuery.findIndex((q) => q.id === id); // find index of corresponding id
    tempQuery[idx][key] = val; // Mutate temp job query
    setJob(tempQuery); // Update new state
  }

  const deleteQuery = (id) => {
    let tempQuery = [...job]; // Clone job query
    tempQuery = tempQuery.filter((q) => q.id !== id); // Remove job query
    setJob(tempQuery); // Update new state
  };

  const addQuery = () => {
    let tempQuery = [...job]; // Clone job query
    tempQuery.unshift({
      id: Date.now(),
      search: "",
      salary: tempQuery[0]?.salary || "",
      enabled: true,
    }); // Add Job Query
    setJob(tempQuery); // Update new state
  };

  function save() {
    // Save parent state with modal's state
    setJobQuery(job);
    handleClose(); // Close Modal
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Search</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <List>
          {job.map(({ id, enabled, search, salary }) => (
            <ListItem disablePadding key={id}>
              <ListItemIcon>
                <Checkbox
                  // edge="start"
                  checked={enabled}
                  // tabIndex={-1}
                  disableRipple
                  onChange={(_, val) => {
                    modifyJob(id, "enabled", val);
                  }}
                />
              </ListItemIcon>
              <ListItemText>
                <TextField
                  margin="dense"
                  label="Job title"
                  fullWidth
                  disabled={!enabled}
                  value={search}
                  onChange={(e) => {
                    modifyJob(id, "search", e.target.value);
                  }}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                />
              </ListItemText>
              <ListItemText style={{ marginLeft: 20 }}>
                <TextField
                  type="number"
                  margin="dense"
                  label="Salary per month"
                  fullWidth
                  disabled={!enabled}
                  value={salary}
                  onChange={(e) => {
                    modifyJob(id, "salary", +e.target.value);
                  }}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                />
              </ListItemText>
              <ListItemIcon onClick={() => deleteQuery(id)}>
                <IconButton color="error" size="large">
                  <Delete fontSize="inherit" />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={addQuery}
          variant="contained"
          startIcon={<Add />}
          color="success"
        >
          Add Job
        </Button>
        <Button variant="contained" startIcon={<Save />} onClick={save}>
          Save
        </Button>
        {/* <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(JobModal);
