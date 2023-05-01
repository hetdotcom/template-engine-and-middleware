const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

let PORT = 8080;
try {
  http
    .createServer(function (req, res) {
      if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });

        const readJSON = JSON.parse(
          fs.readFileSync("./src/credentials.json", "utf-8")
        );

        let template = fs.readFileSync("./index.ejs", "utf-8");
        const data = ejs.render(template, { userdata: readJSON.userdata });

        res.end(data);
      }
      else{
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404");
    }

    })
    .listen(PORT, () => {
      console.log(`listening on port http://localhost:${PORT}/`);
    });
} catch (error) {
    console.log(`Error: ${error.message}`);
}
