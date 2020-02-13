var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name")) {
    window.location = "index.html";
    throw new Error("The name is necessary")
}
var user = {
    name: params.get("name")
}


socket.on('connect', function () {
    socket.emit("enterChat", user, function (resp) {
        console.log(resp)
    })
});

socket.on("sendMessage", function (message) {
    console.log(message)
})

socket.on('disconnect', function () {
    console.log('We have lost connection with server');
});

socket.on("peopleList", function (people) {
    console.log(people)
})
