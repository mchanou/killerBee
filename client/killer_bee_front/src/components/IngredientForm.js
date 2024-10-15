import { TextField, FormControl} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useState, useEffect } from "react";
import {useSnackbar } from "notistack";
import KbDialog from "./KbDialog";
import { apiPOST } from "../services/apiManager";


const IngredientForm = forwardRef((props, ref) =>{

    const {enqueueSnackbar} = useSnackbar();
    const initialIngredient =  {
        "NomIngredient": "",
        "DescriptionIngredient": ""
    }
    const [ingredient, setIngredient] = useState(initialIngredient)

    function submit(){
        apiPOST('/api/addIngredient', ingredient).then((rsp)=>{
            if(rsp.statusCode === 200 && rsp.statusText === "OK"){
                enqueueSnackbar("Ingredient added !", {variant: "success"})
                props.onClose();
            }
            else{
                enqueueSnackbar("Error: Ingredient not added", {variant: "error"})
            }
        })
    }
    
   function handleChange(id, value){
    let values = ingredient;
        values = { ...values, [id]: value };
        setIngredient(values);
   }

   useEffect(()=>{
    if(props.open === false){
        setIngredient(initialIngredient)
    }
}, [props.open])

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
        <FormControl fullWidth>
            <Grid container spacing={2}>
            <Grid size={12}>
            <TextField required label="Name" variant="outlined" placeholder="Enter a name" onChange={(e)=>handleChange("NomIngredient", e.target.value)} fullWidth/>
            </Grid>
            <Grid size={12}>
            <TextField required multiline label="Description" variant="outlined" placeholder="Enter a description" rows={4} 
            onChange={(e)=>handleChange("DescriptionIngredient", e.target.value)} 
            fullWidth 
            />
            </Grid>
            </Grid>
        </FormControl>
        </KbDialog>
        </>
    )
})
export default IngredientForm