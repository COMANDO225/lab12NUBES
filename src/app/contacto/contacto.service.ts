// contacto.service.ts

import { prisma } from "../../utils/prismaClient";
import { Contacto } from "@prisma/client";

export const createContactoService = async (
	data: Omit<Contacto, "id">
): Promise<Contacto> => {
	try {
		const contactoCreado = await prisma.contacto.create({
			data,
		});
		return contactoCreado;
	} catch (error) {
		throw new Error("Error al crear el contacto");
	}
};

export const getContactoService = async (
	contactoId: number,
	userId: number
): Promise<Contacto | null> => {
	try {
		const contacto = await prisma.contacto.findFirst({
			where: {
				id: contactoId,
				userId,
			},
		});
		return contacto;
	} catch (error) {
		throw new Error("Error al obtener el contacto");
	}
};

export const getAllContactosService = async (
	userId: number
): Promise<Contacto[]> => {
	try {
		const contactos = await prisma.contacto.findMany({
			where: {
				userId,
			},
		});
		return contactos;
	} catch (error) {
		throw new Error("Error al obtener los contactos");
	}
};

export const updateContactoService = async (
	contactoId: number,
	userId: number,
	data: Omit<Contacto, "id" | "userId">
): Promise<Contacto> => {
	try {
		const updatedContacto = await prisma.contacto.update({
			where: {
				id: contactoId,
				userId,
			},
			data,
		});
		return updatedContacto;
	} catch (error) {
		throw new Error("Error al actualizar el contacto");
	}
};

export const deleteContactoService = async (
	contactoId: number,
	userId: number
): Promise<void> => {
	try {
		await prisma.contacto.delete({
			where: {
				id: contactoId,
				userId,
			},
		});
	} catch (error) {
		throw new Error("Error al eliminar el contacto");
	}
};

export const deleteAllContactosService = async (
	userId: number
): Promise<void> => {
	try {
		await prisma.contacto.deleteMany({
			where: {
				userId,
			},
		});
	} catch (error) {
		throw new Error("Error al eliminar todos los contactos");
	}
};
