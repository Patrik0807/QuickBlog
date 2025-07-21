import express from 'express'
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, unapproveCommentById } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import verifyAdmin from '../middleware/verifyadmi.js';

const adminRouter=express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.get("/comments",auth,getAllComments);
adminRouter.get("/blogs",auth,getAllBlogsAdmin);

adminRouter.post("/delete-comment",auth,verifyAdmin,deleteCommentById);
adminRouter.post("/approve-comment",auth,verifyAdmin,approveCommentById);
adminRouter.post("/unapprove-comment",auth,verifyAdmin,unapproveCommentById);
adminRouter.get("/dashboard",auth,getDashboard);


export default adminRouter;