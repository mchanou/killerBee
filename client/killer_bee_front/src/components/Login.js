import { TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function Login(){
    return(
        <>
        <Grid container>
            <Grid><TextField label="Login"></TextField></Grid>
            <Grid><TextField label="Password" type='password'></TextField></Grid>
        </Grid>
        </>
    )
}