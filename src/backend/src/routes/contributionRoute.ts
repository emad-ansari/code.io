import { Request, Response, Router} from 'express'
const router = Router();
import * as fs from 'fs';
import { z } from "zod";


const NewProblemInput = z.object({
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	functionName: z.string(),
	parameters: z.string(),
	returnType: z.string(),
});

router.post("/problem", async (req: Request, res: Response) => {
	const { userAuthorized } = req.body;

	try {
		// if (userAuthorized) {
			const parsedInput = NewProblemInput.safeParse(req.body);
			if (parsedInput.success) {
				const {
					title,
					description,
					difficulty,
					functionName,
					parameters,
					returnType,
				} = parsedInput.data;

				/*
				 - user might click multiples time to send data, so also implement reate limit here.
				 - dynamiclly create a new file in problem folder 
				 - then save new problem into file temporary
				 - 
				*/
				
				const filePath = `src/contribution/newproblem/${title.replace(/\s+/g, "_")}.txt`;
				const contentLines = [
                    `ProblemTitle: ${title}`,
                    `Description: ${description}`,
                    `Difficulty: ${difficulty}`,
                    `Function Name: ${functionName}`,
                    `Parameters: ${parameters}`,
                    `Return Type: ${returnType}`
                ]
				const content = contentLines.join('\n') ;
				fs.writeFile(filePath, content, (err) => {
					if (err) {
						console.error("Error writing file:", err);
					} else {
						console.log(`File ${title} has been created successfully.`);
						// if file has been successfully created send an email to user with some nice response like (your problem has been saved thankyou for contribution)
						return res.status(200).json({ message: "Problem has been submitted for review"});
					}
				});
			} else {
				return res.status(400).json({ error: parsedInput.error });
			}
		// }
        //  else {
		// 	return res
		// 		.status(401)
		// 		.json({ error: "You  are not Authorize!! please login" });
		// }
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return res.status(400).json({ error: "Not able to create problem!!" });
	}
});


router.post('testcase', async(req: Request, res: Response) => {
    const {problemTitle, input, output } = req.body;

    try{

    }
    catch(error: any){
        console.error("Error: ", (error as Error).message);
    }
});

export default router;