import { List, Select, TextField, Button } from "@mui/material";



export default function Form({isFreezbe, isProc}){
    return (
        <>
            <TextField label= "Name" variant="outlined" placeholder="Enter a name"></TextField>
            <TextField label= "Description" variant="outlined" placeholder="Enter a description"></TextField>
            {isFreezbe && (
                <><TextField label="Price" variant="outlined"></TextField>
                <TextField label = "Product line" variant="outlined"></TextField>
                <Select label="Ingredient" variant="outlined"></Select>
            <TextField label = "Grammage" variant="outlined"></TextField>
            <Button>Add ingredient to the list</Button>
            <List></List></>)}
                {isProc && (
                <><TextField label="Price" variant="outlined"></TextField>
                <TextField label = "Product line" variant="outlined"></TextField>
                <Select label="Ingredient" variant="outlined"></Select></>)}
        </>
    )
}