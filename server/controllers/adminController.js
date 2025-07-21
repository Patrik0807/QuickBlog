// import jwt from "jsonwebtoken";
// import Comment from "../models/Comment.js";
// import Blog from "../models/Blog.js";

// export const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Invalid credentials" })
//         }
//         const token = jwt.sign({ email }, process.env.JWT_SECRET)
//         res.json({ success: true, token })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// export const getAllBlogsAdmin = async (req, res) => {
//     try {
//         const blogs = await Blog.find({}).sort({ createdAt: -1 });
//         res.json({ success: true, blogs })

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }



// export const getAllComments = async (req, res) => {
//     try {

//         const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
//         res.json({ success: true, comments })

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }

// export const getDashboard = async (req, res) => {
//     try {
//         const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
//         const blogs = await Blog.countDocuments();
//         const comments = await Comment.countDocuments();
//         const drafts = await Blog.countDocuments({ isPublished: false });
//         const dashboardData = { blogs, recentBlogs, comments, drafts };
//         res.json({ success: true, dashboardData });

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }

// export const deleteCommentById = async (req, res) => {

//     try {

//         const { id } = req.body;
//         await Comment.findByIdAndDelete(id);
//         res.json({ success: true, message: "comment deleted successfully" })

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }

// export const approveCommentById = async (req, res) => {

//     try {

//         const { id } = req.body;
//         await Comment.findByIdAndUpdate(id, { isApproved: true });
//         res.json({ success: true, message: "comment approved successfully" })

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }

// export const unapproveCommentById = async (req, res) => {

//     try {

//         const { id } = req.body;
//         await Comment.findByIdAndUpdate(id, { isApproved: false });
//         res.json({ success: true, message: "comment unapproved successfully" })

//     } catch (error) {
//         res.json({ success: false, message: error.message })

//     }
// }

import jwt from "jsonwebtoken";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', email, password);

        const isRealAdmin = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
        const isDemoAdmin = email === process.env.DEMO_ADMIN_EMAIL && password === process.env.DEMO_ADMIN_PASSWORD;

        if (!isRealAdmin && !isDemoAdmin) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Add a flag in token payload to identify if this is demo admin or not
        const token = jwt.sign(
            { email, isDemoAdmin },
            process.env.JWT_SECRET
        );

        res.json({ success: true, token, isDemoAdmin });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json({ success: true, blogs })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}



export const getAllComments = async (req, res) => {
    try {

        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
        res.json({ success: true, comments })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });
        const dashboardData = { blogs, recentBlogs, comments, drafts };
        res.json({ success: true, dashboardData });

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const deleteCommentById = async (req, res) => {

    try {
        if (req.user.isDemoAdmin) {
            return res.status(403).json({ success: false, message: "Demo admin cannot perform this action" });
        }

        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "comment deleted successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const approveCommentById = async (req, res) => {

    try {

        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "comment approved successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const unapproveCommentById = async (req, res) => {

    try {

        const { id } = req.body;
        await Comment.findByIdAndUpdate(id, { isApproved: false });
        res.json({ success: true, message: "comment unapproved successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}