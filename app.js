import 'dotenv/config'
import express from "express";
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
    console.log(path.join(__filepath,'../public', 'index.html'))
    res.sendFile(path.join(__filepath,'../public', 'index.html'))
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