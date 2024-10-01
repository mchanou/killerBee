import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useImperativeHandle, useState } from "react";
import {useSnackbar } from "notistack";
import KbDialog from './KbDialog'


const ProcedureForm=forwardRef((props, ref) =>{

    const {enqueueSnackbar} = useSnackbar();
    const [grammage, setGrammage] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [ingList, setIngList] = useState([])
    const [freezbe, setFreezbe] = useState(
        {
            "name": "",
            "description": "",
            "freezbePrice": "",
            "productLine": "",
            "ingredients": []
        }
    )
    const [sampleIngList, setSampleIngList] = useState([
        {
            "id" : 1,
            "name": "Plastic",
            "description": "description"
        },
        {
            "id": 2,
            "name": "Rubber",
            "description": "this is a description"
        }
    ])

    function handleChange(e){
       setSelectedId(e.target.value)
    }
    function handleGrammage(e){
        setGrammage(e.target.value)
    }

    function handleFreezbe(id, value){
        let values = freezbe;
        values = { ...values, [id]: value };
        setFreezbe(values);
    }

    
    function addIng(){
        if (grammage === 0 || !grammage){
            enqueueSnackbar("The grammage can't be zero", {variant: "warning"})
        }
        else if(grammage && selectedId){
            const selectedItem = sampleIngList.find(item => item.id === selectedId)
            const ing = {
                ...selectedItem,
                grammage: grammage
            }
            setIngList([...ingList, ing])
            setGrammage('')
            setSelectedId('')
            
        }
    }
    function submit(){
        if(ingList){
            setFreezbe({...freezbe, ingredients: [...freezbe.ingredients, ingList]})
            console.log(ingList)
        }
        else{
            enqueueSnackbar("The ingredient list can't be empty", {variant: "warning"})
        }
        
    }
    
    useImperativeHandle(ref, ()=>({
        submitFreezbe: submit 
    }))

    return (
        <>
        <KbDialog
        title="Add a procedure" 
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
                <TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth onChange={(e)=>handleFreezbe("name", e.target.value)}/>
            </Grid>
            <Grid size={12}>
                <TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth onChange={(e)=>handleFreezbe("description", e.target.value)}/>
            </Grid>
                <Grid size={8}>
                    <TextField select required label = "Freezbe's model" variant="outlined" fullWidth></TextField>
                </Grid>
                <Grid size={4}>
                <TextField select required label="Is Validated" variant="outlined" fullWidth>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField required label="Step's Name" variant="outlined" fullWidth></TextField>
                </Grid>
               <Grid size={12}>
                    <TextField required multiline label = "Step's Description" variant="outlined" rows={2} fullWidth></TextField>
                </Grid>
                <Grid size={12}><Button variant="contained">Add step to the list</Button></Grid>
                <Box sx={{borderRadius:1, bgcolor:"#eeeeee", width: 1000, height:200}}>
                
                </Box>
            </Grid>
        </FormControl>
        </KbDialog>
</>
    )
})
export default ProcedureForm