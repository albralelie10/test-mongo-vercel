// import { Request,Response } from "express"
// import  User from "../model/user"

// export const getAll =async(req:Request,res:Response)=>{
//     try{
//         const users=await User.find() 
//         return res.json(users)
//       }catch(err){  
//         return res.status(500).json(err)
//       }
// }

// export const getOne=async(req:Request,res:Response)=>{
//   try{

//     const {id}=req.params;
//       const user=await User.findById({_id:id})
//     return res.status(200).json(user)
//   }catch(err){
//     return res.status(500).json(err)
//   }

// }

// export const addUser=async(req:Request,res:Response)=>{
//     try{
//         const newUser= await User.create(req.body)
  
//         return res.status(201).json(newUser);
  
//       }catch(err){
//           return res.status(500).json(err)
//       }
// }

// export const deleteUser=async(req:Request,res:Response)=>{
//     try{
//       const {id}=req.params;
//         const deleteUser=await User.findOneAndDelete({_id:id})
//       return res.status(200).json(deleteUser)
//     }catch(err){
//       return res.status(500).json(err)
//     }

// }

import { Response,Request } from "express"
import {User,UserConfig,Post,Category} from "../model/user"

export const getAllUsers=async(req:Request,res:Response)=>{
  try{
    const users=await User.find() 
    return res.json(users)
  }catch(err){  
    return res.status(500).json(err)
  }
}
export const addUser=async(req:Request,res:Response)=>{
    try{
    // 1. Define las configuraciones del usuario
    const {config_data,...restData}=req.body
    
  
      // 2. Crea una instancia de UserConfig utilizando las configuraciones
      const userConfig = await UserConfig.create(config_data);
  
      // 3. Crea una instancia de User y asigna la instancia de UserConfig
      const newUser = await User.create({
        ...restData,
        user_configId: userConfig._id, // Asigna el ID de la instancia de UserConfig
      });
  
      // 4. Guarda el usuario y su configuración en la base de datos
      await newUser.save();
  
      // Devuelve una respuesta exitosa
      return res.status(201).json(newUser);

    }catch(err){
        return res.status(500).json(err)
    }
}
export const addPost = async (req: Request, res: Response) => {
  try {
    // 1. Obtén el ID del usuario de ejemplo o de cualquier otro usuario existente
    const {post_category,title,content,user_authorId}=req.body
  
    // 2. Crea instancias de Category con los nombres de las categorías
    let freshCtg=[]
    if(Array.isArray(post_category)){
     for(const obj_ctg of post_category){
        const newCategory = await Category.create(obj_ctg)
        await newCategory.save()
        freshCtg.push(newCategory)
     }
    }
    freshCtg.forEach(item=>console.log(`${item._id}`))

    // 3. Crea una instancia de Post con los datos del nuevo post y el ID del usuario
    const newPost = await Post.create({
      title,
      content,
      user_authorId: user_authorId, // Asigna el ID del usuario como autor del post
      post_categoryId:freshCtg.map(item=>`${item._id}`) // Agrega las categorías al post
    });


    // Agrega el nuevo post al campo "post" del usuario

    const user=await User.findById({_id:user_authorId})
    if(user){
      user.post.push(newPost._id)
      await user.save();
    }

    // Devuelve una respuesta exitosa
    return res.status(201).json(newPost);
  } catch (err) {
    // Manejo de errores
    console.error(err);
    return res.status(500).json({ msg: "Server Error", err });
  }
};
