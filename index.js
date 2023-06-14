const dotEnv = require('dotenv')
const connectDB = require('./db.js')
const express = require('express')
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
dotEnv.config()

app.use(express.json());
app.use(cors())

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/users',require('./routes/users.js'))
app.use('/api/test',require('./routes/test.js'))

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})