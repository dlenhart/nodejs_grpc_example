const client = require("./client");

// Testing client
// 
// client.getAll(null, (err, data) => {
//     console.log(data);
// });

// client.get({ id: 1 }, (err, data) => {
//     console.log(data);
// })

client.insert({ id: 1 }, (err, data) => {
    console.log(data);
})