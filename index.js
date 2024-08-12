const { parse } = require("csv-parse");
const fs = require("fs");

// We now need to read the file using fs and fs.createReadStream(path[, options])
// found in node documentation , then register to event emitter

const result = []; // initializing an empty array to store the received data from the stream
fs.createReadStream("kepler_data.csv")
  //Here we really need to read data row by row as it come and in a readable way
  // and this is done by parse func. how to connect parse with the function createReadStream?
  // Because parse was designed to read streams, it uses another method to connect
  // two interested stream together and read it like so:

  // the pipe function is meant to connect a readable stream saurce to a
  // writable stream destination(a stream that takes in data as supposed to giving you data)
  // in this case the "kepler_data.csv" is the saurce while paser() is the destination for pipe()
  .pipe(
    parse({
      // we can pass in object telling it how it will treate the saurce file
      comment: "#",
      columns: true,
    })
  )
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
