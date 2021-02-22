const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"))

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("*", (req, res) => {
    res.redirect("/");
})

app.listen(port, () => {
    console.log("LISTENING ON:", port);
})