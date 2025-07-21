// 🧠 Import mongoose library to interact with MongoDB using schemas and models
import mongoose from "mongoose";

// 📝 Define the structure (schema) of a blog document
const commentSchema = new mongoose.Schema({
    blog: { type:mongoose.Schema.Types.ObjectId,ref:'blog', required: true },
    name: { type: String,required: true },
   content: { type: String, required: true },
   
    isApproved: { type: Boolean, default:false },

}, { timestamps: true });


// 📦 Create the Blog model from the schema
// This represents the 'blogs' collection in MongoDB
const Comment=mongoose.model('Comment',commentSchema);

export default Comment;