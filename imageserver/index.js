const express = require("express");
const { sendFile } = require("express/lib/response");
const path = require("path");
const fs = require("fs");
const fileUplaod = require("express-fileupload");
const app = express();
const port = 3001;
app.use(fileUplaod());
app.use("/images", express.static(__dirname + "/images"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  console.log(req.files);

  const { files } = req.files;
  // console.log(image);
  if (!files) return res.sendStatus(400);
  files.mv(__dirname + "/images/" + files.md5);

  const u = "/images/" + files.md5;
  res.send(u);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
