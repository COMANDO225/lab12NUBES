import { object, string } from "zod";

export const createContactoSchema = object({
	body: object({
		nombre: string({
			required_error: "El nombre es requerido",
			invalid_type_error: "El nombre debe ser un string",
		})
			.min(2, "El nombre debe tener al menos 2 caracteres")
			.max(100, "El nombre no puede tener más de 100 caracteres")
			.trim(),

		apellido: string({
			invalid_type_error: "El apellido debe ser un string",
		})
			.min(2, "El apellido debe tener al menos 2 caracteres")
			.max(100, "El apellido no puede tener más de 100 caracteres")
			.trim(),

		telefono: string({
			required_error: "El teléfono es requerido",
			invalid_type_error: "El teléfono debe ser un string",
		})
			.min(7, "El teléfono debe tener al menos 7 caracteres")
			.max(15, "El teléfono no puede tener más de 15 caracteres")
			.trim(),

		direccion: string({
			invalid_type_error: "La dirección debe ser un string",
		})
			.min(5, "La dirección debe tener al menos 5 caracteres")
			.max(255, "La dirección no puede tener más de 255 caracteres")
			.trim(),

		email: string({
			invalid_type_error: "El email debe ser un string",
		})
			.email("Debe ingresar un email válido")
			.trim(),
	}),
});

export const updateContactoSchema = object({
	body: object({
		nombre: string({
			invalid_type_error: "El nombre debe ser un string",
		}),
		apellido: string({
			invalid_type_error: "El apellido debe ser un string",
		}),
		telefono: string({
			invalid_type_error: "El teléfono debe ser un string",
		}),
		direccion: string({
			invalid_type_error: "La dirección debe ser un string",
		}),
		email: string({
			invalid_type_error: "El email debe ser un string",
		}),
	}),
});
