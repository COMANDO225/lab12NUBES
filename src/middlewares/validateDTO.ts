import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const transformZodError = (error: ZodError) => {
	return error.issues.map((issue) => ({
		relativeField: issue.path.join("."),
		field: issue.path[issue.path.length - 1],
		message: issue.message,
	}));
};

const validate = (schema: AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (Object.keys(req.body).length === 0)
			return res
				.status(400)
				.json({ ok: false, message: "No se recibieron datos" });
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					ok: false,
					errors: transformZodError(error),
				});
			}
		}
	};
};

export default validate;
