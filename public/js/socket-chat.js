var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name")||!params.has("room")) {
    window.location = "index.html";
    throw new Error("The name and room are necessary")
}
var user = {
    name: params.get("name"),
    room: params.get("room")
}


socket.on('connect', function () {
    socket.emit("enterChat", user, function (resp) {
        renderizeUsers(resp)
    })
});
socket.on("createMessage",function(response){
    renderizeMessages(response,false)
    scrollBottom
})

socket.on('disconnect', function () {
    console.log('We have lost connection with server');
});

socket.on("peopleList", function (people) {
    renderizeUsers(people)
})
//Private Messages | Listen from server
socket.on("privateMessage",function(message){
   console.log("Private message: ",message);
})