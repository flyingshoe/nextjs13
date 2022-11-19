import { Fab } from "@mui/material";

export default function MyFab({ children, ...props }) {
  return (
    <Fab sx={{ position: "fixed", bottom: 30, right: 15 }} {...props}>
      {children}
    </Fab>
  );
}
