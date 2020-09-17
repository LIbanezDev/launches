import React from "react";
import {Box, Button, Card, CardContent, FormGroup, TextField, Typography} from '@material-ui/core';
import {Field, Form, Formik} from 'formik';
import {gql, useMutation} from '@apollo/client';
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadIcon from "@material-ui/icons/CloudUpload";
import {useSnackbar} from "notistack";
import {useFetchUser} from "../../lib/user";


const initialValues = {
    email: 'lucas.one@usm.cl',
    pass: 'pass1',
};

const LoginC = () => {

    const {enqueueSnackbar} = useSnackbar();

    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <Card elevation={5}>
                    <CardContent>
                        <Typography variant="h5">Create Product</Typography>
                        <Formik
                            initialValues={initialValues} onSubmit={async (values, formikHelpers) => {
                            const res = await fetch('/api/login',{
                                method: 'POST',
                                body: JSON.stringify(values)
                            })

                            const json = await res.json()

                            if (json.ok) {
                                enqueueSnackbar('Bienvenido a la aplicación!', {
                                    variant: 'success'
                                })
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
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        startIcon={isSubmitting ? <CircularProgress size={24}/> : <UploadIcon/>}
                                        disabled={isSubmitting}>
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default LoginC
