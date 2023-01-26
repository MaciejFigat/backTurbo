import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import userRoutes from '../routes/userRoutes'
import articleRoutes from '../routes/articleRoutes'
import fragmentRoutes from '../routes/fragmentRoutes'
import connectDB from '../config/db'
import { notFound, errorHandler } from '../middleware/errorMiddleware'
// import lexapiRoutes from '../routes/lexapiRoutes'
import axios from 'axios'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

//todo lex API
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
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
app.use('/api/articles', articleRoutes)
app.use('/api/fragments', fragmentRoutes)
//todo 
// app.use('/lexapi', lexapiRoutes)

//todo lex API search query

app.get(`/lexapi/search/`, async (req: any, res: any, next) => {

    const searchquery = req.query.searchquery

    axios.get(`https://null.turbo-lex.pl/search/?query=${searchquery}`)
        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });

})
// todo https://null.turbo-lex.pl/doc/26042463?query_doc=dochodowy&selected_doc=2
app.get(`/lexapi/doc/`, async (req: any, res: any, next) => {

    const { query, selectedDoc, docNumber } = req.query

    //? 87283004?query=sp%C3%B3%C5%82ki+skarbu+pa%C5%84stwa&selected=0&jumpto=True"

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}&selected_doc=${selectedDoc}`)
        // axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query=${query}&selected=${selectedDoc}`)
        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})
//? /lexapi/doc/id/query Doc id and query - used in recent links
app.get(`/lexapi/doc/id/query`, async (req: any, res: any, next) => {

    const { query, docNumber } = req.query

    //? 87283004?query=sp%C3%B3%C5%82ki+skarbu+pa%C5%84stwa&selected=0&jumpto=True"

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}`)
        // axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query=${query}&selected=${selectedDoc}`)
        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})



//!WORK IN PROGRESS /searchSkip

// todo https://null.turbo-lex.pl/searchSkip/?query=cfc&skip=1&take=2&start_date=20160101&end_date=20220101
app.get(`/lexapi/searchSkip/`, async (req: any, res: any, next) => {

    const { query, skip, take, start_date, end_date } = req.query
    axios.get(`https://null.turbo-lex.pl/searchSkip/?query=${query}&skip=${skip}&take=${take}&start_date=${start_date}&end_date=${end_date}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})
//!
// todo https://null.turbo-lex.pl/doc/26042463
app.get(`/lexapi/doc/nr`, async (req: any, res: any, next) => {

    axios.get(`https://null.turbo-lex.pl/doc/${req.query.nr}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


})
// ! Working example ----------- 
// app.get('/lexapi', async (req: any, res: any, next) => {

//     axios.get(`https://null.turbo-lex.pl/`)
//         .then(response => {
//             console.log(response.data.url);
//             console.log(response.data);
//             res.json(JSON.parse(JSON.stringify(response.data)))
//         })
//         .catch(error => {
//             console.log(error);
//         });

// })
// ! Working example End ----------




// const __dirname = path.resolve()





if (process.env.NODE_ENV === 'production') {

    // app.use(express.static(path.resolve(__dirname, "/frontend/build")));

    // app.get("*", function (request, response) {
    //     response.sendFile(path.resolve(__dirname, "/frontend/build", "index.html"));
    // });

    // app.use(express.static(path.join(__dirname, '/frontend/build')))
    // app.get('*', (req, res) =>
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    // )

    // app.use(express.static('frontend/build'));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'));

    // });

    // app.use(express.static('frontend/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    // });


    // define the folder that will be used for static assets
    app.use(express.static(path.join(path.resolve(), 'frontend/build')));

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(path.resolve(), 'frontend/build', 'index.html'));
    })

    // app.use('/', express.static(path.join(path.resolve(), '/frontend/build')))
    // app.get('*', (req, res) =>

    //     res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html'))

    // )
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





