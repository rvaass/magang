// src/components/Dialog.js
import React from "react";
import { Dialog as MuiDialog, DialogContent, DialogActions } from "@mui/material";
import { Button } from "./Button";

export function Dialog({ open, onOpenChange }) {
  return (
    <MuiDialog open={open} onClose={() => onOpenChange(false)}>
      <DialogContent>
        <h3 className="text-xl font-semibold">Are you sure you want to delete this item?</h3>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onOpenChange(false)} className="bg-gray-500 hover:bg-gray-600">
          Cancel
        </Button>
        <Button
          onClick={() => onOpenChange(false)}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
