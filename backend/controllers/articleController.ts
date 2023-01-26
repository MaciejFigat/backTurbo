import asyncHandler from 'express-async-handler'
import Article from '../models/blogArticleModel'

// @description Fetch all articles
// @route GET /api/articles
// @access Public

const getArticles = asyncHandler(async (req, res) => {

    const articles = await Article.find({})
    res.json(articles)
})
//     const pageSize = 10
//     const page = Number(req.query.pageNumber) || 1

//     // req.query is how I get query strings
//     const keyword = req.query.keyword
//         ? {
//             name: {
//                 // I put this so I don't have to match the exact name
//                 $regex: req.query.keyword,
//                 // 'i' means here it's case insensitive
//                 $options: 'i',
//             },
//         }
//         : {}

//     // part of pagination
//     const count = await BlogArticle.countDocuments({ ...keyword })

//     const articles = await BlogArticle.find({ ...keyword })
//         .limit(pageSize)
//         .skip(pageSize * (page - 1))
//     // find method when passed {} - empty object -> gives everything

//     res.json({ articles, page, pages: Math.ceil(count / pageSize) })
// })


// @description Fetch single Article
// @route GET /api/articles/:_id
// @access Public

const getArticleById = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)
    // this will give me (req.params.id) whichever id that is in url

    //   const article = articles.find((p) => p._id === req.params.id)
    // for each article find _id that is equal to :id (from route ) (request object.params.id - the last thing in the route)
    if (article) {
        res.json(article)
    } else {
        res.status(404)
        throw new Error('article not found')
    }
})

// @description delete an article
// @route DELETE /api/articles/:_id
// @access private/admin

const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)

    if (article) {
        await article.remove()
        res.json({ message: 'Article removed' })
    } else {
        res.status(404)
        throw new Error('Article not found')
    }
})

// @description create an Article
// @route POST /api/articles/
// @access private/admin

const createArticle = asyncHandler(async (req, res) => {

    const {
        topline,
        headline,
        subtitle,
        imgLink,
        author
    } = req.body

    const article = new Article({
        topline,
        headline,
        subtitle,
        imgLink,
        author
    })

    const createdArticle = await article.save()
    res.status(201).json(createdArticle)
})

// @description update a product
// @route PUT /api/products/:id
// @access private/admin

const updateArticle = asyncHandler(async (req, res) => {
    const {
        topline,
        headline,
        subtitle,
        imgLink,
        author
    } = req.body
    const article = await Article.findById(req.params.id)

    if (article) {
        article.topline = topline
        article.headline = headline
        article.subtitle = subtitle
        article.imgLink = imgLink
        article.author = author

        const updatedArticle = await article.save()
        res.json(updatedArticle)
    } else {
        res.status(404)
        throw new Error('Article not found')
    }
})
export { getArticles, getArticleById, deleteArticle, createArticle, updateArticle }