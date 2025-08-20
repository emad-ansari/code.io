import { RootState, useAppDispatch} from "@/app/store";
import { CodeTemplate } from "@/components/common/CodeTemplate";
import { Button } from "@/components/ui/button";
import { addNewTemplate } from "@/features/problemSlice";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";

export const CodeTemplateForm = () => {
    const dispatch = useAppDispatch();
    const { templates } = useSelector(
		(state: RootState) => state.problem
	);
	return (
		<div className=" max-w-4xl flex flex-row justify-between gap-3">
			<div className=" shadow-lg rounded-2xl  border-[1.5px] border-code-border flex-col w-full pb-5">
				<div className="bg-slate-800 flex items-center px-5 py-4 rounded-tl-2xl rounded-tr-2xl">
					<h2 className="text-2xl font-bold text-white">
						Add Template & Boiler Function
					</h2>
				</div>
				<div
					className={`flex flex-col justify-start  max-h-[600px] overflow-y-auto ${
						templates.length === 0 && " items-center pt-10"
					}`}
				>
					<div className=" px-4 py-4 flex flex-col gap-4 text-lg overflow-y-scroll mb-2">
						{templates.length === 0 ? (
							<div className="font-fugaz">
								No Template added yet
							</div>
						) : (
							templates.map((template, index) => (
								<CodeTemplate
									key={template.id}
									id={template.id}
									language={template.language}
									templateNo={index + 1}
									full_template={template.full_template}
									boiler_code={template.boiler_code}
								/>
							))
						)}
					</div>

					<div className="px-4 flex justify-center">
						<Button
							className="flex flex-row gap-3 bg-code-dark rounded-xl "
							onClick={() => dispatch(addNewTemplate())}
						>
							<Plus className="w-4 h-4" />
							Add More Template
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
