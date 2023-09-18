const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
    // const toDo = await ToDoModel.find();
    //    res.send({data: toDo});

    const toDo = await ToDoModel.find({ status: "todo" })
    const Progress = await ToDoModel.find({ status: "inProgress" })
    const Done = await ToDoModel.find({ status: "done" })
   
    const responseData = {
        todo: toDo,
        progress: Progress,
        done: Done
    };

    res.send(responseData);

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

// module.exports.updateToDo = async(req, res)=>{
//     const {id}= req.params;
//     const { title, description } = req.body;

//     try{
//         const updateToDo = await ToDoModel.findByIdAndUpdate(id, {title, description},{new : true });
//         if(!updateToDo){
//             return res.status(404).send("not found!!!!!!")
//         }
//         console.log('Sucessfully updated');
//         console.log('result : ',updateToDo);
//         res.send(updateToDo); 
//     }
//     catch (error) {
//         console.error("Error Updating ToDo:", error);
//         res.status(500).send("Internal server error");
//     }
// }
module.exports.updateToDo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const updateToDo = await ToDoModel.findByIdAndUpdate(id, { title, description, status }, { new: true });

        if (!updateToDo) {
            return res.status(404).send("not found!!!!!!");
        }

        console.log('Successfully updated');
        console.log('result : ', updateToDo);
        res.send(updateToDo);
    } catch (error) {
        console.error("Error Updating ToDo:", error);
        res.status(500).send("Internal server error");
    }
};
module.exports.updateToDoStatus = async (req, res) => {
    const { cardId } = req.params;
    const { status } = req.body; // 'status' is the new stage

    try {
        const updateToDo = await ToDoModel.findByIdAndUpdate(cardId, { status }, { new: true });

        if (!updateToDo) {
            return res.status(404).send("Not found");
        }

        console.log('Successfully updated status');
        console.log('Result:', updateToDo);
        res.send(updateToDo);
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).send("Internal server error");
    }
};


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