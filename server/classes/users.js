class Users{
    constructor(){
        this.people=[];
    }
    addPerson(id,name,room){
        let person={
            id,name,room
        }
        this.people.push(person); 
        return this.people;
    }
    getPerson(id){
        let person=this.people.filter((p)=>{
            return p.id===id
        })[0];
        return person;
    }
    getPeople(){
        return this.people;
    }
    getPeopleByRoom(room){
        let peopleInRoom=this.people.filter((p)=>{
            return p.room===room
        })
        return peopleInRoom
    }
    deletePerson(id){
        let deletedPerson=this.getPerson(id)
        this.people=this.people.filter(p=>{
            return p.id !=id
        })
        return deletedPerson
    }
}

module.exports={
    Users
}