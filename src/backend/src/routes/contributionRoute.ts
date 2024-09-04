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

const NewTestCaseInput = z.object({
    problemTitle: z.string(),
    input: z.string(),
    output: z.string()
});

// ensure the problem title must be unique when creating a new problem

router.post("/problem", async (req: Request, res: Response) => {
	// const { userAuthorized } = req.body;

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
                // [Todo]- make capitalize the first caharacter eg.(hello there -> Hello There)
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
						// [Todo]-  if file has been successfully created send an email to user with some nice response like (your problem has been saved thankyou for contribution)
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


router.post('/testcase', async(req: Request, res: Response) => {
    // const { userAuthorized } = req

    try{
        const parseTestcaseInput = NewTestCaseInput.safeParse(req.body);
        if (parseTestcaseInput.success){
            const { problemTitle, input, output } = parseTestcaseInput.data;
            const filePath = `src/contribution/newtestcase/${problemTitle.replace(/\s+/g, "_")}.txt`;
            const prepareTestcaseContent = [
                `Problem Title: ${problemTitle}`,
                `Input: ${input}`,
                `Output: ${output}`
            ];
            const testcase = prepareTestcaseContent.join('\n');
            fs.writeFile(filePath, testcase, (err) => {
                if (err){
                    console.error("Error while writing testcase file:", err);
                    return res.status(500).json({error: "Not able to save the problem please try after some time"});
                }
                else {
                    // [Todo] - send an email to user as a response
                    return res.status(200).json({ message: "Your testcase has been saved for review, thankyou for contribution"});
                }
            });
        }
        else {
            return res.status(400).json({ error: parseTestcaseInput.error});
        }
    }
    catch(error: any){
        console.error("Error: ", (error as Error).message);
    }
});

export default router;