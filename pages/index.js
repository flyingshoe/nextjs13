import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import FabWrapper from "../components/FabWrapper";

export default function Home() {
  return (
    <>
      <h1>Home page!</h1>

      <FabWrapper>
        <RefreshIcon />
        <EditIcon />
      </FabWrapper>
    </>
  );
}
