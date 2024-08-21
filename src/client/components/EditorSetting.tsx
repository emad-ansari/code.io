import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setIsOpen } from "../features/editorSettingSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
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
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					Modal title
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<IoCloseOutline />
				</IconButton>
				<DialogContent dividers>
					<Typography gutterBottom>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</Typography>
					<Typography gutterBottom>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</Typography>
					<Typography gutterBottom>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur
						et. Donec sed odio dui. Donec ullamcorper nulla non
						metus auctor fringilla.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Save changes
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</React.Fragment>
	);
}
