import React from 'react';
import {Field, Form, Formik} from "formik";
import {Box, Card, CardContent, FormGroup, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {gql, useMutation} from "@apollo/client";
import {useSnackbar} from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";

const REGISTER_MUTATION = gql`
    mutation REGISTER($name: String!, $age: Int!, $email: String!, $pass: String!) {
        register(name: $name, age: $age, email: $email, password: $pass){
            success
            code
            message
        }
    }
`

const initialValues = {
    name: "",
    email: "",
    age: "",
    pass: ""
}


const Register = () => {

    const [register] = useMutation(REGISTER_MUTATION)
    const {enqueueSnackbar} = useSnackbar();

    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <Card elevation={5}>
                    <CardContent>
                        <Typography variant="h5"> Register </Typography>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values, formikHelpers) => {
                                const {data: {register: res}} = await register({
                                    variables: values
                                })
                                if (res.success) {
                                    enqueueSnackbar("Registrado satisfactoriamente", {
                                        variant: "success"
                                    })
                                } else {
                                    enqueueSnackbar(res.message, {
                                        variant: "error"
                                    })
                                }
                            }}>
                            {({values, isSubmitting}) => (
                                <Form autoComplete="off">
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="name" type="text" as={TextField} label="Name"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="age" type="number" as={TextField} label="Age"/>
                                        </FormGroup>
                                    </Box>
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
                                        startIcon={isSubmitting ? <CircularProgress size={24} /> : null}
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Registrar
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Register;
