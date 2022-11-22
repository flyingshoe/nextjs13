import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/jobSearch/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    router.events.on("routeChangeError", () => {
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Navbar />
      {loading && <LinearProgress />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
