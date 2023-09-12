// import express from "express"
// import {getAll,getOne,deleteUser,addUser} from "../controller/controller"
// const router=express.Router()

// router.route("/users").get(getAll).post(addUser)
// router.route("/users/:id").get(getOne).delete(deleteUser)


// export default router;

import express from "express"
import {getAllUsers,addUser,addPost} from "../controller/controller"
const router=express.Router()

router.route("/users").get(getAllUsers).post(addUser)
router.route("/posts").post(addPost)


export default router;