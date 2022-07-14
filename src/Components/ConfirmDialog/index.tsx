import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect } from "react";

export default function ConfirmDialog(props: any) {
  const [open, setOpen] = React.useState(props.open);
  const [dialogContentText, setDialogContentText] = React.useState(
    props.dialogContentText
  );
  const title = props.title || "Are you sure to delete ?";

  useEffect(() => {
    setOpen(props.open);
    setDialogContentText(props?.dialogContentText);
  }, [props?.dialogContentText, props.open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={props.onConfirm}
        aria-labelledby="are you sure to delete"
      >
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText
              ? dialogContentText
              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => props.onConfirm("cancel")}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => props.onConfirm("confirm")}
            color="primary"
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
