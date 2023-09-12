"use strict";
// import mongoose from "mongoose"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Post = exports.User = exports.UserConfig = void 0;
// const userSchema= new mongoose.Schema({
//     email:{
//         type:String
//     },
//     pass:{
//         type:String
//     }
// })
// export default mongoose.model("user",userSchema)
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// Enumeración Role
const RoleEnum = ['REGISTER_USER', 'ADMIN'];
// Enumeración Theme
const ThemeEnum = ['DARK', 'WHITE'];
// Modelo UserConfig
const UserConfigSchema = new Schema({
    emailUpdates: { type: Boolean, default: false },
    theme: { type: String, enum: ThemeEnum, default: 'WHITE' },
});
exports.UserConfig = mongoose_1.default.model('UserConfig', UserConfigSchema);
// Modelo User
const UserSchema = new Schema({
    nombre: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: RoleEnum, default: 'REGISTER_USER' },
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    user_configId: { type: String, unique: true, ref: 'UserConfig' },
});
exports.User = mongoose_1.default.model('User', UserSchema);
// Modelo Post
const PostSchema = new Schema({
    title: { type: String },
    content: { type: String, maxlength: 2000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    user_authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    post_categoryId: [{ type: Schema.Types.ObjectId, ref: "Post" },],
});
exports.Post = mongoose_1.default.model('Post', PostSchema);
// Modelo Category
const CategorySchema = new Schema({
    category_name: { type: String },
});
exports.Category = mongoose_1.default.model('Category', CategorySchema);
//# sourceMappingURL=user.js.map