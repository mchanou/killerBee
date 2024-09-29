import { List, Select, TextField, Button } from "@mui/material";



export default function Form({isFreezbe, isProc}){
    return (
        <>
            <TextField label= "Name" variant="outlined" placeholder="Enter a name"></TextField>
            <TextField label= "Description" variant="outlined" placeholder="Enter a description"></TextField>
            {isFreezbe && (
                <><TextField label="Price" variant="outlined" placeholder="Enter the price"></TextField>
                <TextField label = "Product Line" variant="outlined" placeholder="Enter the product line"></TextField>
                <Select label="Ingredient" variant="outlined"></Select>
            <TextField label = "Grammage" variant="outlined" placeholder="Enter the grammage"></TextField>
            <Button>Add ingredient to the list</Button>
            <List></List></>)}
                {isProc && (
                <><TextField label="Step Name" variant="outlined"></TextField>
                <TextField label = "Step Description" variant="outlined"></TextField>
                <Select label="Is Validated" variant="outlined"></Select></>)}
        </>
    )
}