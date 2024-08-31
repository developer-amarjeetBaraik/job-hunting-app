import 'dotenv/config'
import express, {Router} from "express";
import serverless from 'serverless-http';
import { fileURLToPath } from "url";
import path from "path";
import userData from "./routes/userdata.js";

const app = express()
const router = Router()
const port = process.env.PORT

const __filepath = fileURLToPath(import.meta.url)
const __basepath = path.dirname(__filepath)


app.use(express.static(path.join('public')))
app.use(express.json())

app.use('/.netlify/functions/api', router);
app.use('/user-data', userData)


router.get('/',(req, res)=>{
    // res.send('home page')
    console.log(path.join(__dirname, './public', 'index.html'))
    res.sendFile(path.join(__dirname, './public', 'index.html'))
})

router.get('/hello',(req, res)=>{
    res.send('hello from server')
})

router.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

router.listen(port, ()=>{
    console.log(`App is listening on post ${port}`)
})

export const handler = serverless(app);