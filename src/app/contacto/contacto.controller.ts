import { Response } from "express";
import { CustomRequest } from "../../interfaces/userRequest";
import {
	createContactoService,
	getAllContactosService,
	getContactoService,
	deleteAllContactosService,
	deleteContactoService,
	updateContactoService,
} from "./contacto.service";

export const create = async (req: CustomRequest, res: Response) => {
	try {
		const { nombre, apellido, telefono, direccion, email } = req.body;
		const userId = req.user.id;

		const contacto = await createContactoService({
			nombre,
			apellido,
			telefono,
			direccion,
			email,
			userId,
		});

		res.status(201).json({
			ok: true,
			message: "Contacto creado correctamente",
			contacto,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

export const getOne = async (req: CustomRequest, res: Response) => {
	try {
		const { contactoId } = req.params;
		const userId = req.user.id;

		const contacto = await getContactoService(Number(contactoId), userId);

		if (!contacto) {
			return res.status(404).json({
				ok: false,
				message: "Contacto no encontrado",
			});
		}

		res.status(200).json({
			ok: true,
			contacto,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

export const getAll = async (req: CustomRequest, res: Response) => {
	try {
		const userId = req.user.id;

		const contactos = await getAllContactosService(userId);

		res.status(200).json({
			ok: true,
			contactos,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

export const update = async (req: CustomRequest, res: Response) => {
	try {
		const { contactoId } = req.params;
		const userId = req.user.id;
		const { nombre, apellido, telefono, direccion, email } = req.body;

		const contacto = await updateContactoService(
			Number(contactoId),
			userId,
			{
				nombre,
				apellido,
				telefono,
				direccion,
				email,
			}
		);

		res.status(200).json({
			ok: true,
			message: "Contacto actualizado correctamente",
			contacto,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

export const deleteOne = async (req: CustomRequest, res: Response) => {
	try {
		const { contactoId } = req.params;
		const userId = req.user.id;

		await deleteContactoService(Number(contactoId), userId);

		res.status(200).json({
			ok: true,
			message: "Contacto eliminado correctamente",
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};

export const deleteAll = async (req: CustomRequest, res: Response) => {
	try {
		const userId = req.user.id;

		await deleteAllContactosService(userId);

		res.status(200).json({
			ok: true,
			message: "Contactos eliminados correctamente",
		});
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			res.status(400).json({
				ok: false,
				message: error.message,
			});
		}
	}
};
