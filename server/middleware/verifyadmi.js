const verifyAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL; // your fixed admin email

    if (req.user?.isDemoAdmin) {
    return res.status(403).json({
      success: false,
      message: "Demo admin cannot perform this action",
    });
  }
  
  if (req.user?.email === adminEmail) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
};

export default verifyAdmin;