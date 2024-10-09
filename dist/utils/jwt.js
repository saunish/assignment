import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'abc123';
export const generateToken = (userID) => {
    return jwt.sign({ userID }, SECRET, { expiresIn: '1h' });
};
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
