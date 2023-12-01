const fs = require("fs");

// this function gets called on every request reaching the server
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    // req.on is an event listener, it will listen to "data" event.
    // Request data is passed in chunks. The data event will be fired whenever a new chunk of data is being read.
    // Callback function will be executed for every data event (for every incoming data piece).
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk); // append every chunk
    });
    // end: fired once it's done parsing the incoming request
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message); // block the execution of the next line until this file is done processing
      fs.writeFile("message.txt", message, (err) => {
        // execute the callback when the file is done processing, this will not block further execution
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  /* Callback functions are just registered internally, they will not be executed synchronously as they are registered,
     but they will be executed on an event listener (execute when the event in question happens). */

  /* This part of the code would execute BEFORE the writeFile, parse body, etc. 
    That is why we put the return statement next to registering an event listeners.
  */
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = "Some hard coded text";
