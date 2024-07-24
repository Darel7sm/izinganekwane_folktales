import { Schema, model, InferSchemaType } from 'mongoose'

const commentSchema = new Schema(
  {
    userId: { type: String, required: true },
    text: { type: String, required: true },
    replies: [{ userId: String, text: String }],
  },
  { timestamps: true }
)

const reactionSchema = new Schema(
  {
    likes: [{ type: String }], 
    dislikes: [{ type: String }], 
    comments: [commentSchema],
    favorites: [{ type: String }],
  },
  { timestamps: true }
)

type Reactions = InferSchemaType<typeof reactionSchema>

export default model<Reactions>('Post', reactionSchema)
