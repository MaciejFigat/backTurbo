import express from 'express'
import { getResponse } from '../controllers/lexController'

const router = express.Router()



router.route('/').get(getResponse)
// router.route('https://null.turbo-lex.pl/').get(getResponse)


export default router