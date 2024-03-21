const express = require("express");
require("dotenv").config();
const cors = require("cors");

//const schema = require("./schema");
const schema = require("./gqlSchema/scheduleSchema")
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db");

connectDB();
const app = express();
app.use(
  cors({ allowedHeaders: "*", origin: "*", allowControlAllowOrigin: "*" })
);
// app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.use("/schedule", graphqlHTTP({ schema, graphiql: true }));

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(port, () => console.log("Listening at " + port));
