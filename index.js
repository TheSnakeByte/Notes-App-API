require('dotenv').config();
const cons = require("coloured-logs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const handleReq = require("./api-v1.0/api-v1.0");

app.get("/", (req, res) => {
  res.redirect("/api/v1.0");
});

app.get("/api/v1.0", (req, res) => {
  res.send(`
    <h3>Welcome to the Notes App API!</h3>
    <p>Query by sending either a GET, POST, PUT or DELETE request to /api/v1.0/[NOTE-ID-HERE]. Everything included in the body will be set as the value to the respective database entry (key) for POST and PUT requests.</p>
    `);
});

app.all("/api/v1.0/:noteId", async (req, res) => {
  cons.info(`Request received, method: ${req.method}, note id: ${req.params.noteId}`);
  const response = await handleReq(req.method, req.params.noteId, req.body);
  const status = response.status;
  delete response.status;
  res.status(status).json(response);
});

app.listen(port, () => {
  cons.server(`Listening on port ${port}`);
});
