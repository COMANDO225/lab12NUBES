import { Router } from "express";
import * as contactoController from "./contacto.controller";
import { authenticate } from "../../middlewares/authenticate";
import validate from "../../middlewares/validateDTO";
import {
	createContactoSchema,
	updateContactoSchema,
} from "./contacto.validation";

const contactoRouter = Router();

contactoRouter.use(authenticate);

contactoRouter.post(
	"/",
	validate(createContactoSchema),
	contactoController.create
);
contactoRouter.get("/:contactoId", contactoController.getOne);
contactoRouter.get("/", contactoController.getAll);
contactoRouter.put("/:contactoId", contactoController.update);
contactoRouter.delete("/:contactoId", contactoController.deleteOne);
contactoRouter.delete("/", contactoController.deleteAll);

export default contactoRouter;
