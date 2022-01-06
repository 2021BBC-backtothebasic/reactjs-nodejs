const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const db = require("mysql");

// Routes
// const pages = require("./routes/pages");

// app.use("/intr", pages);


app.get("/", (req, res)=>{
	res.json({a:111, b:222});
})
app.get("/intr", (req, res)=>{
	res.send("tt")
})

const port = process.env.nodePORT || 3001;

app.listen(port, ()=>{
	console.log(`server is running http://localhost:${port}`);
});

