import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }  
  );
};

export {generateRefreshToken, generateToken}