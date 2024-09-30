import { useState } from "react"
import { Button, Dialog, DialogActions, DialogTitle, Divider } from "@mui/material"
import Form from "./Form"

export default function KbDialog({title, opening, handleClose, isFreezbe, isProc}){

    return(
        <>
        <Dialog
        open = {opening}
        fullWidth
        maxWidth="md"
        >
            <DialogTitle>{title}</DialogTitle>
            <Divider/>
            <Form isFreezbe={isFreezbe} isProc={isProc}/>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit">Submit</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}