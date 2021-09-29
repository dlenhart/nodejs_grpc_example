const client = require("./client");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todos", (req, res) => {
	client.getAll(null, (err, data) => {
		if (err) {
			console.log(err)
			return res.json(err);
		}

		return res.json(data.todos);		
	});
});

app.get("/todos/:id", (req, res) => {
	const payload = {
		id: req.params.id
	}

	client.get(payload, (err, data) => {
		if(err) {
			console.log(err)
			return res.json(err);			
		}

		return res.json(data);
	})

})

app.post("/todos", (req, res) => {
	const newTodo = {
		author: req.body.author,
		todo: req.body.todo,
		completed: req.body.completed
	};

	client.insert(newCustomer, (err, data) => {
		if (err) {
			return res.json(err);
		}

		console.log("Customer created successfully", data);
		return res.json(data);
	});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server running at port %d", PORT);
});
