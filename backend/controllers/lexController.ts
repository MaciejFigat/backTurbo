import asyncHandler from 'express-async-handler'
import axios from 'axios'

// @description 
// @route GET /lexapi
// @access Public

const getResponse = asyncHandler(async (req, res) => {


    axios.get(`https://null.turbo-lex.pl/`)
        .then(response => {
            // console.log(response.data.url);
            console.log(response.data);
            res.json(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(error => {
            console.log(error);
        });


    res.json(res)
})

export { getResponse }