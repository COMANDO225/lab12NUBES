import { ContactoRouter, UserRouter } from "../app";
import { Application, Router } from "express";

const listRoutes: [string, Router][] = [
	["/user", UserRouter],
	["/contacto", ContactoRouter],
	// proximas rutas
];

export const routes = (app: Application) => {
	for (const [path, router] of listRoutes) {
		try {
			app.use(`/api${path}`, router);
		} catch (error) {
			console.log(`error en la ruta ${path}: ${error}`);
		}
	}
};
