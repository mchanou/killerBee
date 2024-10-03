import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import {useSnackbar } from "notistack";
import KbDialog from './KbDialog'
import { apiPOST } from "../services/apiManager";


const FreezbeForm = forwardRef((props, ref) =>{

    const {enqueueSnackbar} = useSnackbar();
    const [grammage, setGrammage] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [ingList, setIngList] = useState([])
    const initialFreezbe = {
        "name": "",
        "description": "",
        "freezbePrice": "",
        "productLine": "",
        "ingredients": []
    }
    const [freezbe, setFreezbe] = useState(initialFreezbe)
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
            apiPOST('/', freezbe).then((rsp)=>{
                if(rsp.statusCode === 200 && rsp.statusText === "OK"){
                    enqueueSnackbar("Freezbe model added !", {variant: "success"})
                }
                else{
                    enqueueSnackbar("Error: Freezbe model can't be added", {variant:"error"})
                }
            })
        }
        else{
            enqueueSnackbar("The ingredient list can't be empty", {variant: "warning"})
        }
    }

    useEffect(()=>{
        if(props.open === false){
            setIngList([])
            setFreezbe(initialFreezbe)

        }
    }, [props.open])

    return (
        <>
        <KbDialog 
        title="Add a freezbe model" 
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
            <Grid size={4}>
                    <TextField required label="Price" variant="outlined" placeholder="Enter the price" fullWidth onChange={(e)=>handleFreezbe("freezbePrice", e.target.value)}/>
                </Grid>
                <Grid size={8}>
                    <TextField required label = "Product Line" variant="outlined" placeholder="Enter the product line" fullWidth onChange={(e)=>handleFreezbe("productLine", e.target.value)}/>
                </Grid>
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
                <Grid size={12}><Button variant="contained" onClick={()=>{console.log(freezbe)}}>Test Button</Button></Grid>
            <Grid size={12}>
            <Box sx={{borderRadius:1, bgcolor:"#eeeeee", height:200}}>
            {/* <Typography variant="h5" marginLeft={2}>Ingredient List</Typography> */}
            <Stack direction="row" spacing={1} padding={1}>
            {ingList.map((ing)=>{
                       return(
                        <Chip label={ing.name + " : "+ ing.grammage+"cg"} onDelete={()=>{setIngList(ingList.filter(a => a.id !== ing.id))}}></Chip>
                       )
                })}
            </Stack>
            </Box>
            </Grid>
            </Grid>
        </FormControl>
        </KbDialog>
        </>
    )
})
export default FreezbeForm