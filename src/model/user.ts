// import mongoose from "mongoose"

// const userSchema= new mongoose.Schema({
//     email:{
//         type:String
//     },
//     pass:{
//         type:String
//     }
// })

// export default mongoose.model("user",userSchema)

import mongoose, { SchemaTypes } from 'mongoose'

const { Schema } = mongoose;

// Enumeración Role
const RoleEnum = ['REGISTER_USER', 'ADMIN'];

// Enumeración Theme
const ThemeEnum = ['DARK', 'WHITE'];

// Modelo UserConfig
const UserConfigSchema = new Schema({
  emailUpdates: { type: Boolean, default: false },
  theme: { type: String, enum: ThemeEnum, default: 'WHITE' },
});

export const UserConfig = mongoose.model('UserConfig', UserConfigSchema);

// Modelo User
const UserSchema = new Schema({
  nombre: { type: String,require:true },
  email: { type: String, unique: true,require:true },
  age: { type: Number ,require:true},
  password: { type: String,require:true },
  role: { type: String, enum: RoleEnum, default: 'REGISTER_USER' },
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  user_configId: { type: String, unique: true, ref:'UserConfig' },
});

export const User = mongoose.model('User', UserSchema);

// Modelo Post
const PostSchema = new Schema({
  title: { type: String },
  content: { type: String, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  user_authorId: { type: Schema.Types.ObjectId, ref:'User' },
  post_categoryId: [{ type:Schema.Types.ObjectId, ref:"Post"},],
});

export const Post = mongoose.model('Post', PostSchema);

// Modelo Category
const CategorySchema = new Schema({
  category_name: { type: String },
});

export const Category = mongoose.model('Category', CategorySchema);


