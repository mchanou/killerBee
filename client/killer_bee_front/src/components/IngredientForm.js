import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useImperativeHandle, useState } from "react";
import {useSnackbar } from "notistack";
import KbDialog from "./KbDialog";


const IngredientForm = forwardRef((props, ref) =>{

    const {enqueueSnackbar} = useSnackbar();
    const [ingredient, setIngredient] = useState(
        {
            "name": "",
            "description": ""
        }
    )

    function submit(){
        
    }
    
   function handleChange(){

   }

    return (
        <>
        <KbDialog 
        title="Add an ingredient" 
        opening={props.open} 
        handleClose={props.onClose} 
        actions={[
                        {
                            label: "Cancel",
                            default: true,
                            onClick: props.onClose,
                        },
                        {
                            label: "Submit",
                            default: true,
                            onClick: submit,
                        },
                    ]}>
        <FormControl sx={{margin: 2}}>
            <Grid container spacing={2}>
            <Grid size={12}>
                <TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth onChange={(e)=>handleChange("name", e.target.value)}/>
            </Grid>
            <Grid size={12}>
                <TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth onChange={(e)=>handleChange("description", e.target.value)}/>
            </Grid>
            </Grid>
        </FormControl>
        </KbDialog>
        </>
    )
})
export default IngredientForm