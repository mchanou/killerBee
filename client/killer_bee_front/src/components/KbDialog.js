import { useState } from "react"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import Form from "./Form"

export default function KbDialog({title, opening, handleClose, isFreezbe, isProc}){

    return(
        <>
        <Dialog
        open = {opening}
        onClose = {handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <Form isFreezbe={isFreezbe} isProc={isProc}/>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}