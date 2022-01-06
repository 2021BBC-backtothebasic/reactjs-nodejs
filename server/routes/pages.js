const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get("/", (req, res)=>{
	console.log("router test");
})


let test = {a:"abc", b: 1234}
let testurl = "/test";
axios({
	method: "get",
	url: "https://nodeserver00.run.goorm.io"+testurl 
}).then((res)=>{console.log(test)});

module.exports = router;
