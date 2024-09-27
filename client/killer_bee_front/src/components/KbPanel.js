import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import KbDialog from './KbDialog'
import { Button } from '@mui/material';

export default function KbPanel({title, isFreezbe}){

    const [open, setOpen] = React.useState(false)

    function handleOpen(){
      setOpen(true)
  }
  function handleClose(){
    setOpen(false)
  }
    return(
        <>
        <Button variant='contained' onClick={handleOpen}><AddIcon/>Add</Button>
        <KbDialog title={title} opening = {open} handleClose={handleClose} isFreezbe={isFreezbe}></KbDialog>
        </>
    )
}