import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3004;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };
