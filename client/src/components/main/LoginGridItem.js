import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

axios.defaults.withCredentials = true

const Login=({ handleChange })=>{

    const paperStyle={padding :20,height:'70vh',width:340, margin:"20px auto"}
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const initialValues = {
        email: '',
        userpwd: '',
        remember: false
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('please enter valid email').required("Required"),
        userpwd: Yup.string().required("Required")
    })

    const onSubmit = (values, props) => {
        
        console.log(values);
        const {email, userpwd} = values;
        console.log(email);
        console.log(userpwd);
        axios.post(`http://localhost:3001/auth/signin`,  { email, userpwd } )
        .then(response => {   
           console.log("recieved token :" + response.token);
           return response.token;
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })

        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
        // axios.get(`http://localhost:5000/auth/signin`, { withCredentials: true})
        // .then(response => {
        //     console.log(response.date)
        // })
    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} label='Email' name="email"
                                placeholder='Enter Email' fullWidth required
                                helperText={<ErrorMessage name="email" />}
                            />
                            <Field as={TextField} label='Password' name="userpwd"
                                placeholder='Enter password' type='password' fullWidth required
                                helperText={<ErrorMessage name="userpwd" />} />
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Log in"}</Button>

                        </Form>
                    )}
                </Formik>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}


export default Login



