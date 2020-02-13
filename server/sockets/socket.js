const { io } = require('../server');
const {Users}=require("../classes/users")
const users=new Users();
const {createMessage}=require("../utils/utils")

io.on('connection', (client) => {
    client.on("enterChat",(user,cb)=>{
        if(!user.name||!user.room){
            return cb({
                error:true,
                message:"Name/room is necessary"
            })
        }
        client.join(user.room)
        users.addPerson(client.id,user.name,user.room)
        client.broadcast.to(user.room).emit("peopleList",users.getPeopleByRoom(user.room));
        client.broadcast.to(user.room).emit("createMessage",createMessage("Admin",`${user.name} joined`))
        cb(users.getPeopleByRoom(user.room)) //Returns all the users in a room
    })
    client.on("disconnect",()=>{
        let deletedPerson=users.deletePerson(client.id)
        client.broadcast.to(deletedPerson.room).emit("createMessage",createMessage("Admin",`${deletedPerson.name} left`))
        client.broadcast.to(deletedPerson.room).emit("peopleList",users.getPeopleByRoom(deletedPerson.room));
    })
    client.on("createMessage",(data,callback) => {
        let person=users.getPerson(client.id)

        let message=createMessage(person.name,data.message)
        client.broadcast.to(person.room).emit("createMessage",message)
        callback(message)
    })

    //Private messages
    /*
    client.on("privateMessage",(data) => {
        let person=users.getPerson(client.id)
        client.broadcast.to(data.to).emit("privateMessage",createMessage(person.name,data.message))
    })*/
});