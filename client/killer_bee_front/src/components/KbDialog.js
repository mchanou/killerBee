import { useRef } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material"
import Form from "./FreezbeForm"
import { Close } from '@mui/icons-material';
export default function KbDialog({title, opening, handleClose, children, actions=[]}){
    const formRef = useRef();

    function submit(){
        if(formRef.current){
            formRef.current.submitFreezbe();
        }
    }

    return(
        <>
        <Dialog
        open = {opening}
        fullWidth
        maxWidth="md"
        scroll="paper"
        >
            <DialogTitle>{title} 
                {opening ? (
                <Button
                sx={{position: "absolute", right: 4, top: 10}}
                variant="contained"
                    onClick={handleClose}
                >
                    Close
                    <Close />
                </Button>
            ) : null}</DialogTitle>
            <Divider/>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
            {actions.map((action) => (
                                <Button
                                    key={action.label}
                                    variant={
                                        action.default
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() => {
                                        if (
                                            typeof action.onClick === 'function'
                                        )
                                            action.onClick();
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
            </DialogActions>
        </Dialog>
        </>
    )
}