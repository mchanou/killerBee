import { FormControl, TextField, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import swal from 'sweetalert';
import { useState } from 'react'
import sha512 from 'js-sha512';
import authService from '../services/auth.service'

export default function Login(){
    const {enqueueSnackbar} = useSnackbar()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const submitLogin = async(e)=>{
        e.preventDefault()

        if(!login || !password){
            //enqueueSnackbar("The form is not complete", {variant: "warning"})
            swal('Failed', "The form is incomplete", 'error');
            return;
        }

        const response = await authService.login(login, sha512(password))
        if (response.error){
            swal('Failed', response.error, 'error');
        }
        window.location.href = '/';
       
    }

    return(
        <div className='mt-20'>
        <h2 className="text-lg xl:text-xl font-extrabold text-center">
                Log in to
            </h2>
            <h1 className="text-2xl xl:text-4xl font-extrabold text-center">
                KillerBee
            </h1>
        <FormControl sx={{margin: 2}}>
        <div className="flex flex-col space-y-4">
            <div><TextField required placeholder="Enter your login" fullWidth label="Login" variant='outlined' value={login} onChange={(e)=>setLogin(e.target.value)}/></div>
            <div><TextField required placeholder="Enter your password" fullWidth label="Password" type='password' value={password} variant="outlined" onChange={(e)=>setPassword(e.target.value)}/></div>
            <div><Button variant="contained" onClick={submitLogin}>Sign in</Button></div>
        </div>
        </FormControl>
       
        </div>
    )
}