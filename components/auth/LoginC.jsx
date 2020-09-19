import React from "react";
import {Box, Button, Card, CardContent, FormGroup, TextField, Typography} from '@material-ui/core';
import {Field, Form, Formik} from 'formik';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";
import {gql, useMutation} from "@apollo/client";
import GoogleButton from "./GoogleButton";

const loginMutation = gql`
    mutation LOGIN($email: String!, $pass: String!){
        login(email: $email, password: $pass){
            success
            token
        }
    }
`

const initialValues = {
    email: 'lucas.one@usm.cl',
    pass: 'pass1',
};

const LoginC = () => {
    const [login] = useMutation(loginMutation)
    const {enqueueSnackbar} = useSnackbar();

    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <Card elevation={5}>
                    <CardContent>
                        <Typography variant="srOnly">Login</Typography>
                        <Formik
                            initialValues={initialValues} onSubmit={async (values, formikHelpers) => {

                            const {data: {login: res}} = await login({
                                variables: values
                            })

                            if (res.success) {
                                enqueueSnackbar('Bienvenido a la aplicación!', {
                                    variant: 'success'
                                })
                                localStorage.setItem('token', res.token)
                                window.location = '/'
                            } else {
                                enqueueSnackbar('Contraseña incorrecta', {
                                    variant: 'error'
                                })
                            }

                        }}>
                            {({values, errors, isSubmitting, isValidating}) => (
                                <Form autoComplete="off">
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="email" as={TextField} label="Email"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="pass" type="password" as={TextField} label="Password"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            startIcon={isSubmitting ? <CircularProgress size={24}/> : null}
                                            disabled={isSubmitting}>
                                            Login
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                        <Box marginBottom={2}>
                            <GoogleButton/>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default LoginC
