"use strict";
// import { Request,Response } from "express"
// import  User from "../model/user"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPost = exports.addUser = exports.getAllUsers = void 0;
const user_1 = require("../model/user");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find();
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Define las configuraciones del usuario
        const _a = req.body, { config_data } = _a, restData = __rest(_a, ["config_data"]);
        // 2. Crea una instancia de UserConfig utilizando las configuraciones
        const userConfig = yield user_1.UserConfig.create(config_data);
        // 3. Crea una instancia de User y asigna la instancia de UserConfig
        const newUser = yield user_1.User.create(Object.assign(Object.assign({}, restData), { user_configId: userConfig._id }));
        // 4. Guarda el usuario y su configuración en la base de datos
        yield newUser.save();
        // Devuelve una respuesta exitosa
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.addUser = addUser;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Obtén el ID del usuario de ejemplo o de cualquier otro usuario existente
        const { post_category, title, content, user_authorId } = req.body;
        // 2. Crea instancias de Category con los nombres de las categorías
        let freshCtg = [];
        if (Array.isArray(post_category)) {
            for (const obj_ctg of post_category) {
                const newCategory = yield user_1.Category.create(obj_ctg);
                yield newCategory.save();
                freshCtg.push(newCategory);
            }
        }
        freshCtg.forEach(item => console.log(`${item._id}`));
        // 3. Crea una instancia de Post con los datos del nuevo post y el ID del usuario
        const newPost = yield user_1.Post.create({
            title,
            content,
            user_authorId: user_authorId,
            post_categoryId: freshCtg.map(item => `${item._id}`) // Agrega las categorías al post
        });
        // Agrega el nuevo post al campo "post" del usuario
        const user = yield user_1.User.findById({ _id: user_authorId });
        if (user) {
            user.post.push(newPost._id);
            yield user.save();
        }
        // Devuelve una respuesta exitosa
        return res.status(201).json(newPost);
    }
    catch (err) {
        // Manejo de errores
        console.error(err);
        return res.status(500).json({ msg: "Server Error", err });
    }
});
exports.addPost = addPost;
//# sourceMappingURL=controller.js.map