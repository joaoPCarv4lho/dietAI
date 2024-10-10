import { CreateNutritionController } from '../controllers/createNutritionController';

import { Router, Request, Response } from 'express';
const userRouter = Router();

userRouter.post("/create", async (req: Request, res: Response) => {
    return new CreateNutritionController().handle(req, res);
});

export default userRouter;