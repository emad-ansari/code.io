import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";




// export const LanguageDropDownMenu = ({ITEMS_ARRAY } : {ITEMS_ARRAY: string[]}) => {
//   console.log('this is item array: ',ITEMS_ARRAY);
//   const { isLanguageMenuOpen } = useSelector((state: RootState) => state.dropdown);
//   const dispatch = useAppDispatch();

//   return (
//     <div
//       className={`flex flex-col bg-darkGray absolute bottom-0 left-0 right-[-20%] top-[110%] h-[195px] items-center rounded-lg py-2 z-10 shadow-md text-sm ${
//         isLanguageMenuOpen
//           ? "transform translate-y-0 opacity-100 block"
//           : "translate-y-[-50%] opacity-0 hidden"
//       } ease-in-out duration-300`}
//     >
//       {ITEMS_ARRAY.map((item, index) => {
//         return (
//           <span key = {index} className="text-white font-normal hover:bg-hover flex  items-center px-2 py-2 w-[90%] rounded-md h-full" onClick = {() => dispatch(setSelectedLanguage(item))}
//           >
//             {item}
//           </span>
//         );
//       })}
//     </div>
//   );
// };
