import asyncHandler from 'express-async-handler'
import Fragment from '../models/fragmentModel'

// @description create new fragment
// @route POST /api/fragments
// @access private

const addNewFragment = asyncHandler(async (req: any, res: any) => {
    const {
        source,
        excerpt,
        coordinates,
        title,
        description,
        query,
        docId,
        keywords,
        keywordValue
    } = req.body


    const fragment = new Fragment({
        user: req.user._id,
        source,
        excerpt,
        coordinates,
        title,
        query,
        description,
        docId,
        keywords,
        keywordValue
    })

    const createdFragment = await fragment.save()

    res.status(201).json(createdFragment)
})




// @description update Fragment 
// @route PUT /api/fragments/:id 
// @access private

const updateFragment = asyncHandler(async (req, res) => {
    const {
        source,
        excerpt,
        coordinates,
        title,
        description,
        docId,
        keywords,
        query,
        keywordValue
    } = req.body
    const fragment = await Fragment.findById(req.params.id)

    if (fragment) {

        fragment.source = source || fragment.source
        fragment.excerpt = excerpt || fragment.excerpt
        fragment.coordinates = coordinates || fragment.coordinates
        fragment.title = title || fragment.title
        fragment.description = description || fragment.description
        fragment.docId = docId || fragment.docId
        fragment.query = query || fragment.query
        fragment.keywords = keywords || fragment.keywords
        fragment.keywordValue = keywordValue || fragment.keywordValue


        const updatedFragment = await fragment.save()
        res.json(updatedFragment)
    }
    else {
        res.status(404)
        throw new Error('Fragment not found')
    }
})



// @description get logged in user fragments
// @route GET /api/fragments/myfragments
// @access private

const getMyFragments = asyncHandler(async (req: any, res: any) => {
    //only want to find fragments that user is equal req.user_id, so only logged in user
    const fragments = await Fragment.find({ user: req.user._id })
    res.json(fragments)
})

// @description delete selected fragment
// @route DELETE /api/fragments/:id
// @access private/admin

const deleteFragment = asyncHandler(async (req, res) => {
    const fragment = await Fragment.findById(req.params.id)

    if (fragment) {
        await fragment.remove()
        res.json({ message: 'Fragment removed' })
    } else {
        res.status(404)
        throw new Error('Fragment not found')
    }
})


// @description get all fragments
// @route GET /api/fragments
// @access private/admin

const getAllFragments = asyncHandler(async (req, res) => {
    const fragments = await Fragment.find({}).populate('user', 'id name')
    res.json(fragments)
})

export {
    addNewFragment,
    updateFragment,
    getMyFragments,
    deleteFragment,
    getAllFragments

}
