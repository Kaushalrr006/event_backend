const {Router} = require("express");

const {getToDo, createToDo, updateToDo} = require("../controllers/ToDoController")

const router = Router()

router.get('/',getToDo)
router.post('/create',createToDo)
router.patch('/update/:id',updateToDo);
// router.patch('/update/:id',updateToDo);



module.exports = router;