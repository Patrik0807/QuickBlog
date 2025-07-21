// 🧠 Import mongoose library to interact with MongoDB using schemas and models
import mongoose from "mongoose";

// 📝 Define the structure (schema) of a blog document
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true },

}, { timestamps: true });


// 📦 Create the Blog model from the schema
// This represents the 'blogs' collection in MongoDB
const Blog=mongoose.model('blog',blogSchema);

export default Blog;