import { app } from "./main";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hola mi king este es tu lab 02");
});

app.listen(port, () => {
	console.log(`Estoy ready en el puerto http://localhost:${port}`);
});
