import express, { Router } from 'express'
import path from 'path'
import multer from 'multer'
import mongoose from 'mongoose'

const router = Router()

router.use(express.json())

//Connecting databse using mongoose
mongoose.connect('mongodb://localhost:27017/jobSeekers').then(data => {
    console.log('Db connected..')
}).catch(err => {
    console.log(err)
})

//Setting schema for the mongoDB user info document
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    role: String,
    resumePath: String, // Path where the resume is stored
})

const resumeInfo = mongoose.model('resumeInfo', userSchema)

//Defining path and name of the uploded file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resumes')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + Date.now() + path.extname(file.originalname))
    }
})

// Setting storage to uploded file
const upload = multer({ storage: storage })


//Handleing the '/user-data' request
router.post('/',upload.single('resume'), async (req, res) => {
    try {
        console.log(req.file)

        const newResume = new resumeInfo({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            resumePath: req.file.path
        })

        await newResume.save()
        res.send('User data saved successfully!')
    } catch (err) {
        console.error('Error saving user data:', err)
        res.status(500).send('Error saving user data.')
    }
})

export default router