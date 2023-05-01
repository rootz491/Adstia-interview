const express = require("express");
const mongoose = require("mongoose");

const url =
	"mongodb+srv://test:rootz491@cluster0.3usnk.mongodb.net/chika-bot?retryWrites=true&w=majority";

const app = express();

const quizzesSchema = new mongoose.Schema({
	userId: String,
	win: Number,
	total: Number,
});

const subSchema = new mongoose.Schema({
	userId: String,
	categories: [String],
});

const Quiz = mongoose.model("quizzes", quizzesSchema);
const Subscriber = mongoose.model("subscribers", subSchema);

app.get("/", (req, res) => {
	const offset = req.query.offset || 0;
	const limit = req.query.limit || 10;

	const quizes = Quiz.find({}).limit(limit).skip(offset).lean().exec();

	res.send(quizes);
});

// join two collections
//  
app.get("/agg", async (req, res) => {
	try {
		const userId = req.query.userId;

		const ex = await Quiz.aggregate([
			{
				$lookup: {
					from: "subscribers",
					localField: "userId",
					foreignField: "userId",
					as: "subscriberUsers",
				},
			},
			{
				$match: {
					userId: userId,
				},
			},
		]).exec();

		res.json(ex);
	} catch (error) {
		console.log(error);
	}
});

app.listen(3000, () => {
	console.log("Server Started");
	mongoose.connect(url).then(() => console.log("MongoDB Connected"));
});

// const nodes = [
// 	{
// 		id: 1,
// 		label: "",
// 		nodes: [
// 			{
// 				id: "1.1",
// 				label: "",
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		label: "",
// 		nodes: [],
// 	},
// ];

// const renderNodeRow = (nodes) => {
// 	if (nodes.length === 0) return;

// 	const nodesElement = [];

// 	nodes.map((node) => {
// 		nodesElement.push(<div key={node.id}>label: {node.label}</div>);

// 		if (node.nodes.length > 0) {
// 			nodesElement.push(renderNodeRow(node.nodes));
// 		}
// 	});

// 	return nodesElement;
// };

// {
// 	nodes.map((node) => {
// 		return <div key={node.id}>label: {node.label}</div>;
// 	});
// }
