import bcrypt from "bcrypt";

const saltRounds = 10;

// Encriptar la contraseña
export const encrypt = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
};

// Comparar la contraseña
export const compare = async (
	password: string,
	hashedPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};
