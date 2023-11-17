import { PrismaClient } from "@prisma/client";

// exportar la instancia de prisma client y el modelo de user y contacto con buenas practicas
export const prisma = new PrismaClient();
