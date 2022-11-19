import { LinearProgress } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/jobSearch/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
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
