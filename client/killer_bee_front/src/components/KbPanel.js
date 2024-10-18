import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import FreezbeForm from './FreezbeForm';
import ProcedureForm from './ProcedureForm';
import IngredientForm from './IngredientForm';
import classNames from 'classnames';

export default function KbPanel({type}){

    const [openFreezbe, setOpenFreezbe] = React.useState(false)
    const [openIng, setOpenIng] = React.useState(false)
    const [openProc, setOpenProc] = React.useState(false)

    function handleOpen(type){
      if(type === "freezbe"){
        setOpenFreezbe(true)
      }
      else if(type === "ingredient"){
        setOpenIng(true)
      }
      else if(type === "procedure"){
        setOpenProc(true)
      }
      
  }
  function handleClose(type){
    if(type === "freezbe"){
      setOpenFreezbe(false)
    }
    else if(type === "ingredient"){
      setOpenIng(false)
    }
    else if(type === "procedure"){
      setOpenProc(false)
    }
  }
    return(
        <>
        <div className="flex mr-3 justify-end">
        <Button variant='contained' onClick={()=>handleOpen(type)}><AddIcon/>Add</Button>
        </div>
        <FreezbeForm open={openFreezbe} onClose={()=>handleClose("freezbe")}/>
        <IngredientForm open={openIng} onClose={()=>handleClose("ingredient")}/>
        <ProcedureForm open={openProc} onClose={()=>handleClose("procedure")}/>
        </>
    )
}