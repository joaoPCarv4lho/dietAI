import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../controllers/createNutritionController";

class createNutritionService{
    async execute({ name, age, weight, height, gender, objective, level }: DataProps){
        try{
            const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Você é um nutricionista especialista em nutrição esportiva. Você analisa o perfil de seus pacientes com uma precisão que nenhum outro especialista possui. Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender}, com peso atual: ${weight}, medindo ${height} de altura, com ${age} de idade com foco e obejtivo em ${objective}, e que atualmente tem um nível de atividade ${level}. Ignore qualquer outro parâmetro que não seja os passados, retorne no formato JSON com as respectivas propriedades: propriedade nome com o nome da pessoa, propriedade objetivo com o objeitvo atual, propriedade idade com a idade, propriedade peso com o peso, propriedade sexo com o sexo, propriedade altura com a altura, propriedade refeições com um array contendo dentro de cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome, propriedade alimentos com array contendo dentro de cada objeto a propriedade nome e a propriedade quantidade com a quantidade em gramas, não retorne nenhuma outra observação além das passadas no prompt, retorne em JSON e não escreva as propriedades com acento.`;

            const response = await model.generateContent(prompt)

            console.log(JSON.stringify(response, null, 2));
            if(response.response && response.response.candidates){

                const jsonText = response.response.candidates[0]?.content.parts[0].text as string;

                let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim();

                let jsonObject = JSON.parse(jsonString)

                return { data: jsonObject }
            }

        }catch(err){
            console.error("Erro JSON: ", err);
            throw new Error("Failed create.")
        }
    }
}

export { createNutritionService }