import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import userRoutes from '../routes/userRoutes'
import fragmentRoutes from '../routes/fragmentRoutes'
import lexapiRoutes from '../routes/lexapiRoutes'
import connectDB from '../config/db'
import { notFound, errorHandler } from '../middleware/errorMiddleware'

import axios from 'axios'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

//todo lex API
app.use((req, res, next) => {

    res.header("Content-Type", "application/json");
    res.header('Access-Control-Allow-Headers', 'Authorization');
    res.header('Access-Control-Allow-Origin', 'https://lexbis.netlify.app');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
//? for preflight checks - CORS related 
app.options("*", function (req, res) {
    res.header("Content-Type", "application/json");
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.send();
});

app.use('/api/users', userRoutes)
app.use('/api/fragments', fragmentRoutes)
app.use('/lexapi', lexapiRoutes)




if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(path.resolve(), 'frontend/build')));


    app.get('*', function (request, response) {
        response.sendFile(path.resolve(path.resolve(), 'frontend/build', 'index.html'));
    })


} else {
    app.get('/', (req, res) => {
        res.send('API is running')
        // @ts-ignore
        next()
    })

}
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(
        colors.yellow.bgGreen.bold(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)

    )
})





