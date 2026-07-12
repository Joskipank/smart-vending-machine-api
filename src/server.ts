import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/machine`);
    console.log("push: slot in machine http://localhost:" + PORT + "/machine/restock");
    console.log("Buy: http://localhost:" + PORT + "/machine/buy");
    console.log("Insert amount: http://localhost:" + PORT + "/machine/insert");
    console.log("maintain machine:  http://localhost:" + PORT + "/machine/maintain");
});