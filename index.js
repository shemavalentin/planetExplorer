const { parse } = require("csv-parse");
const fs = require("fs");

// We now need to read the file using fs and fs.createReadStream(path[, options])
// found in node documentation , then register to event emitter

const result = []; // initializing an empty array to store the received data from the stream
fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    // pushing data into the array
    result.push(data);
  })
  // we can add an emitter to catch the error by chaining
  .on("error", (error) => {
    console.log(error);
  })

  // End the stream when there is no more data/ the file is end
  .on("end", () => {
    console.log(result);
    console.log("No more data to read");
  });

// Using the parse function that knows only EventEmitter. this function uses streaming
// to receive and read data continously.
// parse();
