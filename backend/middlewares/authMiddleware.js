import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;
  
  // Get token from cookie
  token = req.cookies.jwt;
  
  if (token) {
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user info to request
      req.user = { id: decoded.userId };
      
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};