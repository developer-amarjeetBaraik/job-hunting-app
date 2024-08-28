import 'dotenv/config'
import express from "express";
import Serverless from 'serverless-http';
import { fileURLToPath } from "url";
import path from "path";
import userData from "./routes/userdata.js";

const app = express()
const port = process.env.PORT

app.use(express.static('./public'))
app.use(express.json())

app.use('/user-data', userData)

const __filepath = fileURLToPath(import.meta.url)


app.get('/',(req, res)=>{
    res.sendFile(path.join(__filepath, '../public', 'index.html'))
})

// app.listen(port, ()=>{
//     console.log(`App is listening on post ${port}`)
// })

export const handler = Serverless(app);