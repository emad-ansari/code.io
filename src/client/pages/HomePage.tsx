import { Suspense } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import NQueen from "../../assets/NQueen.png";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Suspense fallback = {<p>Loading...</p>}>
			<main className="bg-[#09090b] fixed top-0 bottom-0 left-0 right-0">
				<div className="grid grid-cols-2 fixed bottom-0 left-0 right-0 top-16">
					<div className="pt-20 flex flex-col items-center gap-20">
						<p className=" w-[710px] font-fugaz  text-white text-[38px] text-center tracking-[3.20px] leading-[normal]">
							Master Coding Challenges and Enhance Problem-Solving
							Skills with Code.In
						</p>
						<Button
							classname="w-[60%] h-12 text-white  font-semibold  hover:bg-darkGray rounded-full flex justify-center gap-5 shadow-md text-justify border border-[#334155]"
							onClick={() => navigate("/signup")}
						>
							<span className="flex text-justify ">
								Create an account
							</span>
							<FaArrowRightLong className=" pt-1" />
						</Button>
					</div>
					<div className="">
						<img
							src={NQueen}
							alt=""
							className="w-[95%] h-[90%] cursor-pointer"
						/>
					</div>
				</div>
			</main>
		</Suspense>
	);
};
export default HomePage;
