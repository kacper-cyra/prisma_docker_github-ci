import App from "./app";

const PORT = process.env.PORT || 3000;
const { app } = App();

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
