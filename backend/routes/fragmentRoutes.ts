import express from 'express'
import { protect, admin } from '../middleware/authMiddleware'
import {
    addNewFragment,
    updateFragment,
    getMyFragments,
    deleteFragment,
    getAllFragments
} from '../controllers/fragmentController'

const router = express.Router()

router.route('/').post(protect, addNewFragment).get(protect, admin, getAllFragments)

router.route('/myfragments').get(protect, getMyFragments)

router.route('/:id').delete(protect, deleteFragment).put(protect, updateFragment)

export default router