const express = require("express");
const chess = require("../service/chess");
const router = new express.Router();

router.get("/", async (req, res) => {
	const { title, heading, obj } = await chess;
	if (!obj) {
		return res.render("index", {
			title,
			heading: "Server not Reachable",
			obj: "",
		});
	}
	res.render("index", { title, heading, obj: JSON.stringify(obj) });
});

router.get("/:id", async (req, res) => {
	const { title, heading, obj } = await chess;
	if (!obj) {
		return res.render("code", {
			title,
			heading: "Server not Reachable",
			obj: "",
		});
	}
	if (!obj[req.params.id]) {
		return res.render("code", {
			title,
			heading: "Couldnt find specified chess move",
			obj: "",
		});
	}
	res.render("code", {
		title,
		heading: obj[req.params.id].desc,
		obj: obj[req.params.id].value,
	});
});

router.get("*", async (req, res) => {
	const { title, obj } = await chess;
	if (!obj) {
		return res.render("code", {
			title,
			heading: "Server not Reachable",
			obj: "",
		});
	}
	if (!obj[req.params[0].split("/")[1]]) {
		return res.render("code", {
			title,
			heading: "Couldnt find specified chess move",
			obj: "",
		});
	}
	const head = obj[req.params[0].split("/")[1]].desc;
	const params = req.params[0].split("/");
	const steps = obj[req.params[0].split("/")[1]].value.split(" ");
	const validation =
		JSON.stringify(params.slice(2)) ===
		JSON.stringify(steps.slice(1, 1 + params.slice(2).length));
	if (!validation) {
		return res.render("code", {
			title,
			heading: "Wrong move",
			obj: "Please use correct sequence: " + obj[req.params[0].split("/")[1]].value,
		});
	}
	if (params.slice(2).length == steps.slice(1).length) {
		return res.render("code", {
			title,
			heading: "No more move left",
			obj: "Thanks for playing",
		});
	}
	const value = steps[params.length - 1];

	res.render("code", {
		title,
		heading: "Next move",
		obj: value,
	});
});
module.exports = router;
