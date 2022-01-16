const express = require("express");
const router = require("./routers/chess");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");

const htmlDir = path.join(__dirname, "../public");
app.set("views", path.join(__dirname, "../template/views"));

app.use(express.static(htmlDir));

app.use(router);

app.listen(port, () => {
	console.log("Listing at port: " + port);
});
