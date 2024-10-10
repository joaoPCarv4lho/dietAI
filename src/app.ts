import express from 'express';
import cors from 'cors';
import "dotenv/config";
import userRouter  from "../src/routes/user.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);


export default app;