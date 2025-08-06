const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const swagger = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerOptions = YAML.load("./docs/swagger.yaml");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/api", swagger.serve, swagger.setup(swaggerOptions));

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
