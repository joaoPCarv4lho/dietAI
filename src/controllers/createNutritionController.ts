import { createNutritionService } from "../services/createNutritionService";
import { Request, Response } from "express";

export interface DataProps{
    name: string,
    age: string,
    weight: string,
    height: string,
    gender: string,
    objective: string,
    level: string
}

class CreateNutritionController{
    async handle(req: Request, res: Response){
        const {name, age, weight, height, gender, objective, level} = req.body as unknown as DataProps;

        const createNutrition = new createNutritionService();

        const nutrition = await createNutrition.execute({
            name, 
            age, 
            weight, 
            height, 
            objective, 
            level, 
            gender
        });

        res.send(nutrition);
    }
}

export { CreateNutritionController }