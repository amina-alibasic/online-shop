const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/not-found");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // this has next() built-in, parses the req.body automatically
app.use("/admin", adminRoutes); // for every route staring with /admin, use the mentioned routes
app.use(shopRoutes);

/* 
Handling 404 page should always be at the bottom because the Node.js scans the routes from top to bottom in this file.
* In this way, if the entered route in the browser didn't match any of the above, only then it will return this 404.
* If it was placed first, it would always be executed,
* because we are using app.use() and the default route is not set, which means scan all routes with all types of requests.
*/
app.use(errorController.getNotFound);

// This is an ongoing event listener which keeps the event loop running:
// const server = http.createServer(app); // parameter is a function which executes for every request reaching the server
app.listen(3000);

/* 
EVENT LOOP:
1. check if there are any timer callbacks to execute.
2. Pending callbacks - check other callbacks: write/read file callbacks, any I/O disk & network operations.
If there are too many outstanding callbacks in phase 2, it will continue its loop iteration and execute them in next iteration.
3. Poll phase - retrieve new I/O events, execute callbacks from completed I/O operations. If this is not possible, it will defer the execution 
and register them as a pending callback. If there are also some timers left to execute, it jumps to phase 1 and executes it, without finishing its iteration.
4. Check phase - After the poll phase if the event queue is empty, Node.js moves to the check phase. 
Callbacks registered with setImmediate() are executed in this phase, in the order they were added.
setImmediate() schedules a callback to be executed immediately after the current operation. 
This means certain code will run after the current I/O operation or task is completed.
5. Close callbacks - executes close event callbacks.
6. Exit if there are no more remaining event listeners (refs == 0). However the createServer is an event listener which by default never finishes,
so we have at least one reference at all times.

WORKER POOL - this is something which runs on different thread(s) than a Node.js app, which is running on a single JavaScript thread. 
The Worker Pool does the "heavy lifting" in the app (for example the fs package sends the data to the worker pool 
and it does the file processing or some other operation) and after the operation is done,
it triggers a callback to the Event Loop 
*/
