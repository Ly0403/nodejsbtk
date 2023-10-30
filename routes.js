const { appendFile } = require("fs");
const qs=require("querystring");

const routeHandler=(req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.write(`
              <html>
                  <head>
                      <title>Send Name</title>
                  </head>
                  <body>
                      <form action="/log" method="POST">
                          <input type="text" name="name"/>
                          <input type="text" name="surname"/>
                          <button type="submit">Send</button>
                      </form>
                  </body>
              </html>      
          `);
      res.end();
    } else if (url === "/log" && method === "POST") {
      const endData = [];
      req.on("data", (data) => {
        console.log(data.toString());
        endData.push(data);
      });
      req.on("end", () => {
        appendFile("postdata.txt", qs.parse(Buffer.concat(endData).toString()).name, () => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    }
  }


  module.exports=routeHandler;