import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { NextFunction } from 'express'

const protect = asyncHandler(async (req: any, res: any, next: NextFunction) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            //   it will split by the space and will take 1 element from array that is [Bearer token123]
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
            //@ts-ignore
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Brak autoryzacji, token nieprawidłowy')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Brak autoryzacji, brak tokenu uwierzytelniającego')
    }
})

const admin = (req: any, res: any, next: Function) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Brak uprawnień administratora')
    }
}

export { protect, admin }
