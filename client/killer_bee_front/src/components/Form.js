import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import {useSnackbar } from "notistack";


export default function Form({isFreezbe, isProc}){
    const {enqueueSnackbar} = useSnackbar();
    const [grammage, setGrammage] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [ingList, setIngList] = useState([])
    const [values, setValues] = useState([
        
    ])
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

    return (
        <>
        <FormControl  sx={{margin: 2}}>
            <Grid container spacing={2}>
            <Grid size={12}><TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth></TextField></Grid>
            <Grid size={12}><TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth></TextField></Grid>
            {isFreezbe && (
                <><Grid size={4}><TextField required label="Price" variant="outlined" placeholder="Enter the price" fullWidth></TextField></Grid>
                <Grid size={8}><TextField required label = "Product Line" variant="outlined" placeholder="Enter the product line" fullWidth></TextField></Grid>
                <Grid size={8}>
                    <TextField select label="Ingredient" variant="outlined" fullWidth id="ingSelect" value={selectedId} onChange={handleChange}>
                        <MenuItem value="" disabled>Select an ingredient</MenuItem>
                        {sampleIngList.map((sampleIng)=>{
                            return(
                                <MenuItem value ={sampleIng.id} key={sampleIng.id} disabled={ingList.some(selected => selected.id === sampleIng.id)}>{sampleIng.name}</MenuItem>
                            )
                        })}
                    </TextField>
                        </Grid>
                <Grid size={4}><TextField label = "Grammage" variant="outlined" placeholder="Enter the grammage" name="grammage" value={grammage} onChange={handleGrammage} fullWidth></TextField></Grid>
                <Grid size={12}><Button variant="contained" onClick={addIng}>Add ingredient to the list</Button></Grid>
            <Box sx={{borderRadius:1, bgcolor:"#eeeeee", width: 1000, height:200}}>
            {/* <Typography variant="h5" marginLeft={2}>Ingredient List</Typography> */}
            <Stack direction="row" spacing={1} margin={1}>
            {ingList.map((ing)=>{
                       return(
                        <Chip label={ing.name + " : "+ ing.grammage+"cg"} onDelete={()=>{setIngList(ingList.filter(a => a.id !== ing.id))}}></Chip>
                       )
                })}
            </Stack>
            </Box>
            </>)}
                {isProc && (
                <>
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
                </>)}
            </Grid>
        </FormControl>
        </>
    )
}