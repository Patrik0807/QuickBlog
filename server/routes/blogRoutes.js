import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import verifyAdmin from '../middleware/verifyadmi.js';

const blogRouter=express.Router();

blogRouter.post('/add',upload.single('image'),auth, addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/toggle-publish',auth,verifyAdmin,togglePublish);
blogRouter.post('/delete',auth,verifyAdmin,deleteBlogById);
blogRouter.post('/add-comment',addComment);
blogRouter.post('/comments',getBlogComments);
blogRouter.post('/generate',auth,generateContent);



export default blogRouter;