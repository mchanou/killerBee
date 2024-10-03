import { TextField, Button, FormControl, MenuItem, Box, Chip, Stack} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {useSnackbar } from "notistack";
import KbDialog from './KbDialog'

const ProcedureForm=forwardRef((props, ref) =>{

    function StepItem({index, step, onDelete}){
        return(
            <Chip color="primary" label={step.stepNumber + "." + step.stepName} onDelete={onDelete}></Chip>
        )
    }

    const {enqueueSnackbar} = useSnackbar();
    const initialValues = {
        "name": "",
        "description": "",
        "freezbeModel": "",
        "validation": ""
    }
    const initialStep = {
        "stepName": null,
        "stepDesc": null,
        "stepNumber": 0
    }
    const [procedure, setProcedure] = useState(initialValues)
    const [step, setStep] = useState(initialStep)
    const [stepsList, setStepsList] = useState([])
    const [sampleModelList, setSampleModelList] = useState([
        {
            "id" : 1,
            "name": "Sharingan",
            "description": "description"
        },
        {
            "id": 2,
            "name": "Rinnegan",
            "description": "this is a description"
        }
    ])


    function handleChange(id, value){
        let values = procedure;
        values = { ...values, [id]: value };
        setProcedure(values);
    }

    function handleStep(id, value){
        let values = step;
        values = { ...values, [id]: value };
        setStep(values);
    }

    function addStep(){
        if(!step){
            return;
        }
        const newStep = {
            ...step,
            stepNumber: stepsList.length + 1
        }
        setStepsList([...stepsList, newStep])
        setStep(initialStep)
    }

    function submit(){
        console.log(procedure)
        console.log(stepsList)
        setProcedure(initialValues)
    }

    useEffect(()=>{
        if(props.open === false){
            setProcedure(initialValues)
            setStep(initialStep)
            setStepsList([])
        }
    }, [props.open])

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
                <TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth onChange={(e)=>handleChange("name", e.target.value)}/>
            </Grid>
            <Grid size={12}>
                <TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth onChange={(e)=>handleChange("description", e.target.value)}/>
            </Grid>
            <Grid size={8}>
                    <TextField select required label = "Freezbe's model" variant="outlined" fullWidth onChange={(e)=>handleChange("freezbeModel", e.target.value)}>
                    <MenuItem value="" disabled>Select an ingredient</MenuItem>
                        {sampleModelList.map((sampleModel)=>{
                            return(
                                <MenuItem value ={sampleModel.id} key={sampleModel.id} disabled={stepsList.some(selected => selected.id === sampleModel.id)}>{sampleModel.name}</MenuItem>
                            )
                        })}
                    </TextField>
                </Grid>
                <Grid size={4}>
                <TextField select required label="Is Validated" variant="outlined" fullWidth onChange={(e)=>handleChange("validation", e.target.value)}>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                </TextField>
                </Grid>
                <Grid size={12}>
                    <TextField required label="Step's Name" variant="outlined" fullWidth value={step.stepName} onChange={(e)=>handleStep("stepName", e.target.value)}></TextField>
                </Grid>
               <Grid size={12}>
                    <TextField required multiline label = "Step's Description" variant="outlined" rows={2} fullWidth value={step.stepDesc} onChange={(e)=>handleStep("stepDesc", e.target.value)}></TextField>
                </Grid>
                <Grid size={12}><Button variant="contained" onClick={addStep}>Add step to the list</Button></Grid>
                <Grid size={12}>
                <Box sx={{borderRadius:1, bgcolor:"#eeeeee", height:200}}>
                <Stack direction="row" spacing={1} padding={1}>
                    {stepsList.map((step, index)=>{
                            return(
                            <StepItem step={step} onDelete={()=>{
                                const newSteps = stepsList.filter(a => a.stepName !== step.stepName)
                                const updatedSteps = newSteps.map((step, index)=>({
                                    ...step,
                                    stepNumber: index + 1
                                }))
                                setStepsList(updatedSteps)
                            }}>
                            </StepItem>
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
export default ProcedureForm