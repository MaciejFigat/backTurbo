import { model, Schema, Document } from "mongoose"

export interface Fragment extends Document {
    user: {
        type: any
        required: boolean
        ref: string
    }

    source: string,
    excerpt: string,
    coordinates: string,
    title: string,
    description: string,
    // todo part of keyword functionality
    docId: string,
    query: string,
    keywords: string[],
    keywordValue: { keyword: string, value: boolean, skip: boolean, labelOne: string, labelTwo: string }[]

}

const fragmentSchema = new Schema<Fragment>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },

        source: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        coordinates: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        docId: {
            type: String,
            required: false,
        },
        query: {
            type: String,
            required: false,
        },
        keywords: [{
            type: String,
            required: false,
        }],
        keywordValue: [{
            keyword: String,
            value: Boolean,
            skip: Boolean,
            labelOne: String,
            labelTwo: String

        }


        ],



    },
    { timestamps: true, }
)



const Fragment = model<Fragment>('Fragment', fragmentSchema)

export default Fragment