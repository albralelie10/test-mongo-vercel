import app from './app';
import connect from './db';
import dotenv from "dotenv"
dotenv.config()
const uri=process.env.MONGO_URI as string

async function Start(){
  try{
    await connect()
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  }catch(err){

  }
}

Start();
