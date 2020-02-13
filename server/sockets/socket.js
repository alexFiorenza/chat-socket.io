const { io } = require('../server');
const {Users}=require("../classes/users")
const users=new Users();
const {createMessage}=require("../utils/utils")

io.on('connection', (client) => {
    client.on("enterChat",(user,cb)=>{
        if(!user.name){
            return cb({
                error:true,
                message:"Name is necessary"
            })
        }
        let people=users.addPerson(client.id,user.name)
        client.broadcast.emit("peopleList",users.getPeople());
        cb(people)
    })
    client.on("disconnect",()=>{
        let deletedPerson=users.deletePerson(client.id)
        client.broadcast.emit("createMessage",createMessage("Admin",`${deletedPerson.name} left`))
        client.broadcast.emit("peopleList",users.getPeople());
    })
    client.on("sendMessage",(data) => {
        let person=users.getPerson(client.id)

        let message=createMessage(person.name,data.message)
        client.broadcast.emit("sendMessage",message)
    })
});