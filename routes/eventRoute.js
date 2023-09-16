const {Router} = require("express");

const {getToDo, createToDo, updateToDo, deleteToDo, updateToDoStatus} = require("../controllers/ToDoController")

const router = Router()

router.get('/get',getToDo)
router.post('/create',createToDo)
router.patch('/update/:id',updateToDo);
router.delete('/delete/:id',deleteToDo);
router.patch('/update/:id/status',updateToDoStatus);




module.exports = router;