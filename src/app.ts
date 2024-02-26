import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

const server = new Server(parseInt(process.env.PORT || "8000"));
server.start();