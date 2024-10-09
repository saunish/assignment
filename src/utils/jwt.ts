import jwt from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET || 'abc123';

export const generateToken = (userID: string) => {
	return jwt.sign({ userID }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, SECRET);
};
