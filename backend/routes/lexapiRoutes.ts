import express from 'express'

import { searchRequest, docRequest, docLinksRequest, docNrRequest, searchSkipRequest } from '../controllers/lexController'

const router = express.Router()



router.route('/search/').get(searchRequest)
router.route('/searchSkip/').get(searchSkipRequest)
router.route('/doc/').get(docRequest)
router.route('/doc/id/query').get(docLinksRequest)
router.route('/doc/nr').get(docNrRequest)



export default router