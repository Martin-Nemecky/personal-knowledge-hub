"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";
import { removeBook } from "@/app/_actions/book-actions";
import { Book } from "@/app/_types/definitions";

interface Props {
	book: Book;
}

export default function RemoveDialog({ book }: Props) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton aria-label="delete" onClick={handleClickOpen}>
				<ClearIcon className="size-6 text-red-700" />
			</IconButton>
			<Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-paper": { padding: "15px" } }}>
				<DialogTitle>{"Book Removal"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete {book.title}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={async () => {
							await removeBook(book.id);
							handleClose();
							router.refresh();
						}}
						variant="contained"
						color="error"
						autoFocus
					>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
