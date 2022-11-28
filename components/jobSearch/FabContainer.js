import { Fab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Box, Grow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function FabContainer({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const isGrp = Array.isArray(children);
  const nodeRef = useRef(null);
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  // Screen is MD and up
  if (bigScreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 30,
          right: 15,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {children.map((child, index) => (
          <Fab key={index} color="primary">
            {child}
          </Fab>
        ))}
      </Box>
    );
  }

  // Mobile devices (xs,sm)
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 15,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Check number of children to decide whether to render FAB Group */}
      {!isGrp ? (
        <Fab color="secondary">{children}</Fab>
      ) : (
        <>
          {/* FAB Group */}
          <Grow in={isOpen} timeout={400} style={{ transformOrigin: "bottom" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {children.map((child, index) => (
                <Fab key={index} color="primary">
                  {child}
                </Fab>
              ))}
            </Box>
          </Grow>

          {/* Hide/Show Toggle Button */}
          <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            classNames="rotate"
            timeout={3000}
          >
            <Fab color="secondary" ref={nodeRef} onClick={toggleFab}>
              <AddIcon />
            </Fab>
          </CSSTransition>
        </>
      )}
    </Box>
  );
}
