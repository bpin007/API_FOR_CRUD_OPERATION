const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./db");
const personRouter = require("./routes/person-router");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const verifyToken = require("./middleware/verifyToken");

const app = express();

const PORT = 8888;

db;

app.use(express.json());

// app.post("/login", verifyToken, (req, res) => {});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Authentication Practice",
      description: "I'm learning Backend",
      contact: {
        name: "Bipin",
      },
    },
    securityDefinitions: {
      Bearer: {
        description:
          "Enter the token with the `Bearer` prefix, e.g. 'Bearer abcde12345'",
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8888",
      },
    ],
  },
  apis: ["./routes/**.js", "./routes/**/**.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use("/api/users", personRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
