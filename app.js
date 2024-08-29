import 'dotenv/config'
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import userData from "./routes/userdata.js";

const app = express()
const port = process.env.PORT

const __filepath = fileURLToPath(import.meta.url)
const __basepath = path.dirname(__filepath)

const baseDir = process.env.LAMBDA_TASK_ROOT || __basepath;

app.use(express.static(path.join(baseDir, 'public')))
app.use(express.json())

app.use('/user-data', userData)


app.get('/',(req, res)=>{
    // res.send('home page')
    console.log(path.join(baseDir, 'public'))
    res.sendFile(path.join(baseDir, 'public', 'index.html'))
})

app.get('/hello',(req, res)=>{
    res.send('hello from server')
})

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });

app.listen(port, ()=>{
    console.log(`App is listening on post ${port}`)
})

// export default app;
