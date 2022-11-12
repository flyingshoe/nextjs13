// import httpProxy from 'http-proxy'
var httpProxy = require("http-proxy");
const API_URL = process.env.API_URL; // The actual URL of your API
const proxy = httpProxy.createProxyServer();
// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};
export default (req, res) => {
  console.log("OK");
  //   Promise.resolve(
  //     proxy.web(req, res, { target: "http://localhost:3000/test" })
  //   );
  //   proxy.web(req, res, { target: "http://localhost:3000/test" }, function (e) {
  //     console.log(555, e);
  //   });
  return new Promise((resolve, reject) => {
    console.log("HMMMM");
    proxy.web(
      req,
      res,
      { target: "http://localhost:3000/api/test", changeOrigin: true },
      (err) => {
        console.log("!!!!!");
        if (err) {
          console.log("ERROR", err);
          return reject(err);
        }
        console.log("DONEZO");
        resolve();
      }
    );
    console.log("???? ");
  });
};
