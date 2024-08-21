import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setIsOpen } from "../features/editorSettingSlice";
import { CustomMuiMenuProps } from "../types";
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
					<CustomMuiSelectMenu />
					<CustomMuiSelectMenu />
				</div>
			</BootstrapDialog>
		</React.Fragment>
	);
}

function CustomMuiSelectMenu() {
	const [fontSize, setFontSize] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setFontSize(event.target.value as string);
	};

	return (
		<div className="flex flex-row gap-8 items-center ">
			<Typography sx={{ fontSize: "14px", color: "#d1d5db" }}>
				Font Size:
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
					Font
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={fontSize}
					label="Age"
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
					<MenuItem id="font-menu-item" value={12}>
						12px
					</MenuItem>
					<MenuItem value={14}>14px</MenuItem>
					<MenuItem value={16}>16px</MenuItem>
					<MenuItem value={18}>18px</MenuItem>
					<MenuItem value={20}>20px</MenuItem>
					<MenuItem value={22}>22px</MenuItem>
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
