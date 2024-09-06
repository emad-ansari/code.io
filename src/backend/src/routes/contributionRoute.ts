import { Request, Response, Router} from 'express'
const router = Router();
import * as fs from 'fs';
import { z } from "zod";
import auth from '../middleware/auth';
import { CustomRequestObject } from '../middleware/auth';
import { ParseProblemDetails } from '../lib/index';



const NewProblemInput = z.object({
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	functionName: z.string(),
	testcases: z.array(z.object({input: z.string(), output: z.string()})),
	returnType: z.string(),
});

const NewTestCaseInput = z.object({
    problemTitle: z.string(),
    input: z.string(),
    output: z.string()
});

// ensure the problem title must be unique when creating a new problem

router.post("/problem", auth,  async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	try {
		// if (userAuthorized) {
			const parsedInput = NewProblemInput.safeParse(req.body);
			if (parsedInput.success) {
				const {
					title,
					description,
					difficulty,
					functionName,
					testcases,
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
					`Return Type: ${returnType}`,
					`User Id: ${userId}`,
                    `TestCases: ${JSON.stringify(testcases, null, 2)}`,
               
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
		// else {
		// 	return res.status(401).json({ error: "You  are not Authorize!! please login" });
		// }
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return res.status(400).json({ error: "Not able to create problem!!" });
	}
});


router.post('/testcase', auth,  async(req: Request, res: Response) => {
    const { userAuthorized, userId } = req as CustomRequestObject;

    try{
		if (!userAuthorized) {
			return res.status(401).json({error: "You are not authorize please login"});
		}
        const parseTestcaseInput = NewTestCaseInput.safeParse(req.body);
        if (parseTestcaseInput.success){
            const { problemTitle, input, output } = parseTestcaseInput.data;
            const filePath = `src/contribution/newtestcase/${problemTitle.replace(/\s+/g, "_")}.txt`;
            const prepareTestcaseContent = [
                `Problem Title: ${problemTitle}`,
                `Input: ${input}`,
                `Output: ${output}`,
				`User Id: ${userId}`
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

/*
	
	- first save the problem in database so that you can get the problem id (you can use setInterval which runs after every 12 hours)
	- write a function to trigger the boiler plate generate code after successfully reviewed
	- save all boiler plate code to database
	- need problemId, and language id
	- also save a new problem into Problem model/Table
	- set language id manual
	- after creating and saving the boiler plate code delete the temporary file
*/

async function saveProblem(filePath: string){
	try{
		// 1.for above file path extract the problem info

		
		const parser = new ParseProblemDetails();
		const problem = parser.extractProblemDetails(filePath); 
		console.log("Extracted problem: ", problem);


		// 3.make a database call to create a new problem and return the id.

		
		// 4.make database call to create a new testcase with th given problem id



		// 5.saveBoilerplateCode(problemId);

	}
	catch(error: any){
		console.error("Error: ", (error as Error).message);
	}
}
const filePath = `src/contribution/newproblem/Two_Sum.txt`;
saveProblem(filePath);


async function saveBoilerplateCode(problemId: string){			
	// cosnt java = getJavaBoilerplatecode()
	// const cpp = getCppBoilerplateCode();
	// const javascript = getJavaScriptBoilerpalatecode();
	// const typescript = getTypescriptBoilerplatecode();
	// now save all the boiler code to defualtCode model [needed --> languageId, problemId]
	// how to get the langauge id? answer --> just hard code it for right now

}


export default router;