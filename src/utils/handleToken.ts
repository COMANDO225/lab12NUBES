import { sign, verify } from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = async (
	payload: any,
	expiresIn: string
): Promise<string> => {
	return sign(payload, JWT_SECRET!, { expiresIn });
};

export const verifyToken = async (token: string): Promise<any> => {
	return verify(token, JWT_SECRET!);
};
