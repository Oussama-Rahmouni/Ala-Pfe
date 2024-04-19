import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const authorize = (permittedRoles) => {
    return (req, res, next) => {
      // Check if logged-in user's role is one of the permitted roles for the route
      if (!permittedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Unauthorized access - You do not have permission to view this resource." });
      }
      next(); // User has the correct role, proceed to the next middleware
    };
  };
  
  
export  {authenticate, authorize};