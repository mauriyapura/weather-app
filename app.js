const express = require("express");
const PORT = process.env.PORT || "3000";
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "public/index.html");
});

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})










