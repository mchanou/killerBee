import { List, ListItem, TextField, Button, FormControl, MenuItem, Box, Alert, Snackbar} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { enqueueSnackbar, useSnackbar } from "notistack";



export default function Form({isFreezbe, isProc}){
    const [enqueueSnackbar, closeSnackbar] = useSnackbar()
    const [ingList, setIngList] = useState([])
    const [ing, setIng] = useState({
        "id": 0,
        "grammage": 0
    })
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
       setIng({...ing, 
        [e.target.name] : e.target.value}
       )
    
    }
    
    function addIng()
    {
        if (ing.grammage === 0 || ingList.includes(ing.id)){
          enqueueSnackbar("Incorrect Inputs", {variant: "warning"})
          console.log('bop')
        }
        else{
            console.log('pob')
            setIngList([...ingList, ing])
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
                    <TextField select label="Ingredient" variant="outlined" fullWidth name="id" value={ing.id} onChange={handleChange}>
                        {sampleIngList.map((sampleIng)=>{
                            return(
                                <MenuItem value ={sampleIng.id} key={sampleIng.id}>{sampleIng.name}</MenuItem>
                            )
                        })}
                    </TextField>
                        </Grid>
                <Grid size={4}><TextField label = "Grammage" variant="outlined" placeholder="Enter the grammage" name="grammage" value={ing.grammage} fullWidth onChange={handleChange}></TextField></Grid>
                <Grid size={12}><Button variant="contained" onClick={addIng}>Add ingredient to the list</Button></Grid>
            <Box sx={{borderRadius:1, bgcolor:"#eeeeee", width: 1000, height:200}}>
            <List>
                {ingList.map((ing)=>{
                       return(
                        <ListItem key={ing.id}>{ing.grammage}</ListItem>
                       )
                })}
            </List>
            </Box>
            </>)}
                {isProc && (
                <>
                <Grid size={8}>
                    <TextField required label="Step's Name" variant="outlined" fullWidth></TextField>
                </Grid>
                <Grid size={4}>
                <TextField select required label="Is Validated" variant="outlined" fullWidth>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField required multiline label = "Step's Description" variant="outlined" rows={2} fullWidth></TextField>
                </Grid>
                
                </>)}
            </Grid>
        </FormControl>
        </>
    )
}