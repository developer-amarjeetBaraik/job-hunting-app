import express, { Router } from 'express'
import path from 'path'
import multer from 'multer'
import mongoose from 'mongoose'
import fs from 'fs'

const router = Router()

router.use(express.json())

//Connecting databse using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS_KEY}@project1.jjlpb.mongodb.net/`).then(data => {
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
    resumeData: String, // Path where the resume is stored
})

const resumeInfo = mongoose.model('resumeInfo', userSchema)

// Setting storage to uploded file
const upload = multer({ dest: 'uploads/' });


//Handleing the '/user-data' request
router.post('/', upload.single('resume'), async (req, res) => {
    try {

        const filePath = req.file.path; // Path to the uploaded file

        // Read the file and convert it to a buffer
        fs.readFile(filePath, async (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading file');
            }

            const buffer = Buffer.from(data); // Convert the file data to a buffer

            // Clean up the temporary file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting temp file:', err);
                }
            });

            const newResume = new resumeInfo({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                resumeData: buffer
            })

            await newResume.save()
            res.send('User data saved successfully!')

        });

    } catch (err) {
        console.error('Error saving user data:', err)
        res.status(500).send('Error saving user data.')
    }
})

export default router

// export const handler = Serverless(router);