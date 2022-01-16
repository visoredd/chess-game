const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.chessgames.com/chessecohelp.html";
let obj = {};
const chess = new Promise((resolve, reject) => {
	axios
		.get(url)
		.then((res) => {
			const $ = cheerio.load(res.data);
			const title = $("title").text();
			const heading = $("b").first().text();
			const result = $("table").text().split("\n").slice(1);

			for (let i = 0; i < result.length; i = i + 2) {
				const key = result[i].slice(0, 3);
				const desc = result[i].slice(3);
				const value = result[i + 1];
				obj[key] = { desc, value };
			}
			resolve({ title, heading, obj });
		})
		.catch((e) => {
			reject(e);
		});
});

module.exports = chess;
