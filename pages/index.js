import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import FabContainer from "../components/jobSearch/FabContainer";

export default function Home() {
  return (
    <>
      <h1>Home page!</h1>

      <FabContainer>
        <RefreshIcon />
        <EditIcon />
      </FabContainer>
    </>
  );
}
