import { InferSchemaType, model, Schema } from "mongoose";

const postSchema = new Schema({
    firstTitle: {type: String, required: true},
    secondTitle: {type: String, required: true},
    author: {type: String, required: true},
    text: {type: String, required: true}
},{ timestamps: true })

type Post = InferSchemaType<typeof postSchema>

export default model<Post>("Post", postSchema)