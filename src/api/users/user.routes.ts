import express from "express"
import {getAllUsers,addUser,addPost} from "./user.controllers"


const userRouter=express.Router()

userRouter.route("/").get(getAllUsers).post(addUser)

export default userRouter