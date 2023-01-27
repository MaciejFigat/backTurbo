import asyncHandler from 'express-async-handler'
import axios from 'axios'

// @description 
//todo lex API search query
// @route GET /lexapi
// @access Public

const searchRequest = async (req: any, res: any) => {

    const searchquery = req.query.searchquery

    axios.get(`https://null.turbo-lex.pl/search/?query=${searchquery}`)
        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });

}
// @description 
//todo lex API advanced (with date and amount of requested documents) search query
// @route GET /lexapi
// @access Public

const searchSkipRequest = async (req: any, res: any) => {

    const { query, skip, take, start_date, end_date } = req.query
    axios.get(`https://null.turbo-lex.pl/searchSkip/?query=${query}&skip=${skip}&take=${take}&start_date=${start_date}&end_date=${end_date}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


}
// @description 
//todo lex API doc search query
// @route GET /lexapi
// @access Public
const docRequest = async (req: any, res: any) => {

    const { query, selectedDoc, docNumber } = req.query

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}&selected_doc=${selectedDoc}`)

        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


}
// @description 

//?  Doc id and query - used in recent links
// @route GET /lexapi/doc/id/query
// @access Public
const docLinksRequest = async (req: any, res: any) => {

    const { query, docNumber } = req.query

    axios.get(`https://null.turbo-lex.pl/doc/${docNumber}?query_doc=${query}`)

        .then(response => {

            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


}
// @description 
//?  Doc by the number search
// @route GET /lexapi/doc/id/query
// @access Public
const docNrRequest = async (req: any, res: any) => {

    axios.get(`https://null.turbo-lex.pl/doc/${req.query.nr}`)

        .then(response => {
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


}


export { searchRequest, docRequest, docLinksRequest, docNrRequest, searchSkipRequest }