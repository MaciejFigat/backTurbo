import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import userRoutes from '../routes/userRoutes'
import fragmentRoutes from '../routes/fragmentRoutes'
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
// app.use('/lexapi', lexapiRoutes)


//todo lex API search query
//! TESTING routes and controller
app.get(`/lexapi/search/`, async (req: any, res: any) => {

    const searchquery = req.query.searchquery

    axios.get(`https://null.turbo-lex.pl/search/?query=${searchquery}`)
        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });

})

app.get(`/lexapi/doc/`, async (req: any, res: any) => {

    const { query, selectedDoc, docNumber } = req.query

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}&selected_doc=${selectedDoc}`)

        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})
//? /lexapi/doc/id/query Doc id and query - used in recent links
app.get(`/lexapi/doc/id/query`, async (req: any, res: any) => {

    const { query, docNumber } = req.query

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}`)

        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})





app.get(`/lexapi/searchSkip/`, async (req: any, res: any) => {

    const { query, skip, take, start_date, end_date } = req.query
    axios.get(`https://null.turbo-lex.pl/searchSkip/?query=${query}&skip=${skip}&take=${take}&start_date=${start_date}&end_date=${end_date}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})

// todo https://null.turbo-lex.pl/doc/26042463
app.get(`/lexapi/doc/nr`, async (req: any, res: any) => {

    axios.get(`https://null.turbo-lex.pl/doc/${req.query.nr}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})


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





