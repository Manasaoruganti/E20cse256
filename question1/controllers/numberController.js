const axios = require("axios");
const fetchWithTimeout = (url, timeout) => {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(
			() => reject(new Error("Time Limit Reached")),
			timeout
		);
		axios
			.get(url)
			.then((response) => {
				clearTimeout(timeoutId);
				resolve(response);
			})
			.catch((error) => reject(error));
	});
};

async function getNumbers(req, res) {
	let urls = req.query.url;
	if (typeof urls === "string") {
		urls = urls.split(",");
	}
	try {
		const responses = await Promise.allSettled(
			urls.map((url) => fetchWithTimeout(url.trim(), 300))
		);

		const validResponses = responses.filter(
			(res) => res.status === "fulfilled"
		);
		const responseData = validResponses.map(
			(response) => response.value.data.numbers
		);
		const sortedNumbers = responseData
			.flatMap((numbers) => numbers)
			.sort((a, b) => a - b);

		res.json({ numbers: sortedNumbers });
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error fetching data from one or more URLs." });
	}
}

module.exports = { getNumbers };
