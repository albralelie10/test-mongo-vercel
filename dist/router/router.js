"use strict";
// import express from "express"
// import {getAll,getOne,deleteUser,addUser} from "../controller/controller"
// const router=express.Router()
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.route("/users").get(getAll).post(addUser)
// router.route("/users/:id").get(getOne).delete(deleteUser)
// export default router;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = express_1.default.Router();
router.route("/users").get(controller_1.getAllUsers).post(controller_1.addUser);
router.route("/posts").post(controller_1.addPost);
exports.default = router;
//# sourceMappingURL=router.js.map