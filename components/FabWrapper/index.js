import { Fab } from "@mui/material";
import { useRef, useState } from "react";
import { Box, Grow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FabContainer from "./FabContainer";

export default function FabWrapper({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const isGrp = Array.isArray(children);
  const nodeRef = useRef(null);
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  //Only ONE child
  if (!isGrp) {
    return (
      <FabContainer>
        <Fab color="secondary">{children}</Fab>
      </FabContainer>
    );
  }

  // Large screen (>=md)
  if (bigScreen) {
    return (
      <FabContainer>
        {children.map((child, index) => (
          <Fab key={index} color="primary">
            {child}
          </Fab>
        ))}
      </FabContainer>
    );
  }

  // Mobile devices (xs,sm) with more than ONE child
  return (
    <FabContainer>
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
    </FabContainer>
  );
}
