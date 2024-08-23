import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setIsOpen, setFontSize, setTheme } from "../features/editorSettingSlice";
import { CustomMuiMenuProps } from "../types";

const EDITOR_THEMES = ["default", "GitHub Dark", "OneDark Pro"];
const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '22px' ];

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
	"& .MuiPaper-root": {
		backgroundColor: "#1f2937", // Apply your desired background color here
		color: "#ffffff",
		borderRadius: "10px",
		paddingTop: "3.2rem",
		width: "500px",
		height: "350px",
		paddingLeft: "1.5rem",
		paddingRight: "1.5rem",
	},
	"& MuiButtonBase-root:hover": {
		backgroundColor: "#64748b",
		color: "#64748b",
	},
	"& .MuiOutlinedInput-root": {
		borderColor: "white",
	},
}));

export function EditorSetting() {
	const { isOpen } = useSelector((state: RootState) => state.setting);
	const dispatch = useAppDispatch();
	const handleClose = () => {
		dispatch(setIsOpen(false));
	};

	return (
		<React.Fragment>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={isOpen}
				sx={{}}
			>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[600],
						"&:hover": {
							// Target the hover state
							backgroundColor: "#475569",
							color: "#ffffff", // Optional: Change the icon color on hover
						},
					}}
				>
					<IoCloseOutline />
				</IconButton>
				<div className="flex flex-col gap-5">
					<CustomMuiSelectMenu labelName = "Font" labelValue="Font Size" ITEMS_ARRAY={FONT_SIZES}/>
					<CustomMuiSelectMenu labelName = "Theme" ITEMS_ARRAY={EDITOR_THEMES} labelValue="Theme"/>
				</div>
			</BootstrapDialog>
		</React.Fragment>
	);
}

function CustomMuiSelectMenu(props: CustomMuiMenuProps) {
	const { labelName, labelValue} = props;
	const dispatch = useAppDispatch();
	const { fontSize ,theme} = useSelector((state: RootState) => state.setting);
	const handleChange = (event: SelectChangeEvent) => {
		const value = event.target.value as string;
		if (labelName === "Font"){
			const newFontSize = Number(value.substring(0, 2));
			dispatch(setFontSize(newFontSize));
		}
		if (labelName === 'Theme'){
			dispatch(setTheme(value))
		}
	};

	return (
		<div className="flex flex-row items-center justify-between ">
			<Typography sx={{ fontSize: "14px", color: "#d1d5db" }}>
				{labelValue}
			</Typography>
			<FormControl sx={{ width: "70%" }}>
				<InputLabel
					id="demo-simple-select-label"
					sx={{
						color: "#d1d5db", // Label text color
						"&.Mui-focused": {
							color: "#ffffff", // Optional: Change color when label is focused
						},
					}}
				>
					{labelName}
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={labelName === "Font" ? `${fontSize}px` : theme}
					label = {labelName === "Font" ? "Font" : "Theme"}
					sx={dropDownStyles}
					MenuProps={{
						PaperProps: {
							sx: {
								bgcolor: "#334155", // Dropdown background color
								color: "#d1d5db", // Text color inside the dropdown
							},
						},
					}}
					onChange={handleChange}
				>
					{props.ITEMS_ARRAY.map((item, index) => {
						return (
							<MenuItem
								key={index}
								id="font-menu-item"
								value={item}
							>
								{item}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}

const dropDownStyles = {
	color: "#d1d5db",
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "#64748b", // Change the border color to white
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#64748b", // Maintain border color on hover
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#64748b", // Maintain border color when focused
	},
};
