import { object, string } from "zod";

export const createUserSchema = object({
	body: object({
		email: string({
			required_error: "El email es requerido mi chamo",
			invalid_type_error: "El email debe ser un string",
		})
			.email("Debe ingresar un email valido mi chamo")
			.trim(),

		nombre: string({
			required_error: "El nombre es requerido mi chamo",
			invalid_type_error: "El nombre debe ser un string",
		})
			.min(2, "El nombre debe tener al menos 2 caracteres")
			.max(100, "El nombre no puede tener mas de 100 caracteres")
			.trim(),

		apellido: string({
			required_error: "El apellido es requerido",
			invalid_type_error: "El apellido debe ser un string",
		})
			.min(2, "El apellido debe tener al menos 2 caracteres")
			.max(100, "El apellido no puede tener mas de 100 caracteres")
			.trim(),

		password: string({
			required_error: "La contraseña es requerida",
			invalid_type_error: "La contraseña no es valida",
		})
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.max(100, "La contraseña no puede tener mas de 100 caracteres")
			.trim(),

		passwordConfirmation: string({
			required_error: "La confirmacion de contraseña es requerida",
			invalid_type_error: "La confirmacion de contraseña no es valida",
		})
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.max(100, "La contraseña no puede tener mas de 100 caracteres")
			.trim(),
	})
		.refine((data) => data.password === data.passwordConfirmation, {
			message: "Las contraseñas no coinciden mi chamo",
			path: ["passwordConfirmation"],
		})
		.refine((data) => data.email !== data.password, {
			message: "La contraseña no puede ser igual al email",
			path: ["password"],
		})
		.refine((data) => data.nombre !== data.password, {
			message: "La contraseña no puede ser igual al nombre",
			path: ["password"],
		})
		.refine((data) => data.apellido !== data.password, {
			message: "La contraseña no puede ser igual al apellido",
			path: ["password"],
		}),
});

export const loginUserSchema = object({
	body: object({
		email: string({
			required_error: "El email es requerido mi chamo",
			invalid_type_error: "El email debe ser un string",
		})
			.email("Debe ingresar un email valido mi king")
			.trim(),

		password: string({
			required_error: "La contraseña es requerida",
			invalid_type_error: "La contraseña no es valida",
		})
			.min(6, "La contraseña debe tener al menos 6 caracteres")
			.max(100, "La contraseña no puede tener mas de 100 caracteres")
			.trim(),
	}),
});
