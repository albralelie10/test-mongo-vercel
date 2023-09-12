import express, { application,Request,Response} from 'express';
import user from "./api/users/user.routes"


const app = express();

app.use(express.json());

app.use('/users', user);

app.get("/",(req:Request,res:Response)=>{
    return res.json({msg:"HOME START PAGE"})
})

export default app;