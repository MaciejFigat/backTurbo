import express from 'express'
import { protect, admin } from '../middleware/authMiddleware'
import { createArticle, deleteArticle, getArticleById, getArticles, updateArticle } from '../controllers/articleController'

const router = express.Router()



router.route('/').get(getArticles).post(protect, admin, createArticle)
router.route('/:id').get(getArticleById).delete(protect, admin, deleteArticle).put(protect, admin, updateArticle)

export default router