import { List, Select, TextField, Button, FormControl, MenuItem} from "@mui/material";
import Grid from '@mui/material/Grid2';



export default function Form({isFreezbe, isProc}){
    return (
        <>
        <FormControl  sx={{margin: 2}}>
            <Grid container spacing={2}>
            <Grid size={12}><TextField required label= "Name" variant="outlined" placeholder="Enter a name" fullWidth></TextField></Grid>
            <Grid size={12}><TextField required multiline label= "Description" variant="outlined" placeholder="Enter a description" rows={4} fullWidth></TextField></Grid>
            {isFreezbe && (
                <><Grid size={4}><TextField required label="Price" variant="outlined" placeholder="Enter the price" fullWidth></TextField></Grid>
                <Grid size={8}><TextField required label = "Product Line" variant="outlined" placeholder="Enter the product line" fullWidth></TextField></Grid>
                <Grid size={8}><TextField select label="Ingredient" variant="outlined" fullWidth></TextField></Grid>
                <Grid size={4}><TextField label = "Grammage" variant="outlined" placeholder="Enter the grammage" fullWidth></TextField></Grid>
                <Grid><Button variant="contained">Add ingredient to the list</Button></Grid>
            <List></List></>)}
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