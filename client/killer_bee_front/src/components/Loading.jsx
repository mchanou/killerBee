import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2'

export default function Loading(props) {
    /** STYLE */

    return (
        <Grid
            container
            direction="column"
            display="flex"
            justifyContent="center"
            sx={{
                minWidth: '100%',
                minHeight: '100vh',
            }}
        >
            <Grid display="flex" justifyContent="center">
                <CircularProgress size={100} />
            </Grid>
        </Grid>
    );
}
