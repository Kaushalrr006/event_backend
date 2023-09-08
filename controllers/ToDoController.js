const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    const toDo = await ToDoModel.find();
    res.send(toDo);
}
   
module.exports.createToDo = async (req, res) => {
    const { title, description } = req.body;

    try {
        const data = await ToDoModel.create({ title, description });
        console.log("Created Successfully");
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("Error creating ToDo:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports.updateToDo = async(req, res)=>{
    const {id}= req.params;
    const { title, description } = req.body;

    try{
        const updateToDo = await ToDoModel.findByIdAndUpdate(id, {title, description},{new : true });
        if(!updateToDo){
            return res.status(404).send("not found!!!!!!")
        }
        console.log('Sucessfully updated');
        console.log('result : ',updateToDo);
        res.send(updateToDo); 
    }
    catch (error) {
        console.error("Error Updating ToDo:", error);
        res.status(500).send("Internal server error");
    }
}
module.exports.deleteToDo = async (req, res) => {
    const {id}= req.params;
    const { title, description } = req.body;

    try{
        const deleteToDo = await ToDoModel.findByIdAndDelete(id, {title, description},{new : true });
        if(!deleteToDo){
            return res.status(404).send("not found!!!!!!")
        }
        console.log('Sucessfully updated');
        console.log('result : ',deleteToDo);
        res.send(deleteToDo); 
    }
    catch (error) {
        console.error("Error Updating ToDo:", error);
        res.status(500).send("Internal server error");
    }
}