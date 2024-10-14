import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import {useSnackbar } from "notistack";
import KbDialog from './KbDialog'
import { apiGET, apiPOST } from "../services/apiManager";


const FreezbeForm = forwardRef((props, ref) =>{

    const {enqueueSnackbar} = useSnackbar();
    const [grammage, setGrammage] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [ingList, setIngList] = useState([])
    const initialFreezbe = {
        "NomFreezbe": "",
        "DescriptionFreezbe": "",
        "PrixUHTFreezbe": "",
        "GammeFreezbe": "",
        "IngredientsList": []
    }
    const [freezbe, setFreezbe] = useState(initialFreezbe)
    const [sampleIngList, setSampleIngList] = useState([])

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
            const selectedItem = sampleIngList.find(item => item.IdIngredient === selectedId)
            const ing = {
                ...selectedItem,
                Grammage: grammage
            }
            setIngList([...ingList, ing])
            setGrammage('')
            setSelectedId('')
             
        }
    }
    function submit(){
        if(ingList){
        apiPOST('/api/addFreezbe', freezbe).then((rsp)=>{
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

    useEffect(()=>{
        if(ingList){
            setFreezbe({...freezbe, IngredientsList: ingList})
        }
    }, [ingList])

    useEffect(()=>{
        apiGET("/api/ingredient").then((rsp)=>{
            if(rsp.statusCode === 200 && rsp.statusText === "OK"){
                setSampleIngList(rsp.items)
                props.onClose()
            }
        })
    }, [])

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
                <TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth onChange={(e)=>handleFreezbe("NomFreezbe", e.target.value)}/>
            </Grid>
            <Grid size={12}>
                <TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth onChange={(e)=>handleFreezbe("DescriptionFreezbe", e.target.value)}/>
            </Grid>
            <Grid size={4}>
                    <TextField required label="Price" variant="outlined" placeholder="Enter the price" fullWidth onChange={(e)=>handleFreezbe("PrixUHTFreezbe", e.target.value)}/>
                </Grid>
                <Grid size={8}>
                    <TextField required label = "Product Line" variant="outlined" placeholder="Enter the product line" fullWidth onChange={(e)=>handleFreezbe("GammeFreezbe", e.target.value)}/>
                </Grid>
                <Grid size={8}>
                    <TextField select label="Ingredient" variant="outlined" fullWidth id="ingSelect" value={selectedId} onChange={handleChange}>
                        <MenuItem value="" disabled>Select an ingredient</MenuItem>
                        {sampleIngList ? sampleIngList.map((sampleIng)=>{
                            return(
                                <MenuItem value ={sampleIng.IdIngredient} key={sampleIng.IdIngredient} disabled={ingList.some(selected => selected.IdIngredient === sampleIng.IdIngredient)}>{sampleIng.NomIngredient}</MenuItem>
                            )
                        }): <MenuItem value="" disabled>No ingredient found</MenuItem>}
                    </TextField>
                        </Grid>
                <Grid size={4}><TextField label = "Grammage" variant="outlined" placeholder="Enter the grammage" name="grammage" value={grammage} onChange={handleGrammage} fullWidth></TextField></Grid>
                <Grid size={12}><Button variant="contained" onClick={addIng}>Add ingredient to the list</Button></Grid>
                {/* <Grid size={12}><Button variant="contained" onClick={()=>{console.log(freezbe)}}>Test Button</Button></Grid> */}
            <Grid size={12}>
            <Box sx={{borderRadius:1, bgcolor:"#eeeeee", height:200}}>
            {/* <Typography variant="h5" marginLeft={2}>Ingredient List</Typography> */}
            <Stack direction="row" spacing={1} padding={1}>
            {ingList.map((ing)=>{
                       return(
                        <Chip label={ing.NomIngredient + " : "+ ing.Grammage+"cg"} onDelete={()=>{setIngList(ingList.filter(a => a.IdIngredient !== ing.IdIngredient))}}></Chip>
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