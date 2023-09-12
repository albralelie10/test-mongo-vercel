import mongoose from "mongoose"


export const connectionDB=async(uri:string)=>{
    return mongoose.connect(uri)
            .then(()=>console.log("CONNECT TO DB...."))
                .catch(err=>console.log(err))
}
