const PROTO_PATH = "./proto/todos.proto";

let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let data = require("./data");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

let todo = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

const todos = data.todos;

server.addService(todo.TodoService.service, {
	getAll: (_, callback) => {
		callback(null, { todos });
	},

	get: (call, callback) => {
		let todo = todos.find(n => n.id == call.request.id);

		if (todo) {
			callback(null, todo);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	insert: (call, callback) => {
		let todo = call.request;

		let maxId = Math.max.apply(Math, todos.map(todo => todo.id));
		todo.id = maxId + 1;
		todo.created_at = Date.now();
		todos.push(todo);

		callback(null, todo);
	}
});

server.bindAsync(
    "127.0.0.1:30043",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server at port:", port);
      console.log("Server running at http://127.0.0.1:" + port);
      server.start();
    }
  );
