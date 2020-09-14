import React, {useState} from "react";
import {Box, Button, Card, CardContent, FormGroup, MenuItem, TextField, Typography} from '@material-ui/core';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {number, object, string} from 'yup';
import {makeStyles} from "@material-ui/core/styles";
import {gql, useMutation} from '@apollo/client';
import AlertSnackbar from "../AlertSnackbar";

const ADD_PRODUCT = gql`
    mutation CREATE_PRODUCT($data: ProductInput!){
        createProduct(data: $data) {
            code
            success
            message
        }
    }
`;

const initialValues = {
    name: '',
    stock: 1,
    price: 0,
    image: 'https://longsshotokan.com/wp-content/uploads/2017/04/default-image-620x600.jpg',
};

const ProductsForm = ({user, updateList}) => {
    const [addProduct] = useMutation(ADD_PRODUCT)
    const [alertData, setAlertData] = useState({})

    return (
        <>
            <AlertSnackbar {...alertData} setAlertData={setAlertData}/>
            <div className="animate__animated animate__bounceIn">
                <Card elevation={5}>
                    <CardContent>
                        <Typography variant="h5">Create Product</Typography>
                        <Formik
                            validationSchema={
                                object({
                                    name: string().required('Nombre del producto es obligatorio').min(2).max(100),
                                    stock: number().required().min(1),
                                    price: number().required().min(100),
                                    image: string().required('Imagen es obligatoria!').url("Debe ser una url!")
                                })
                            }
                            initialValues={initialValues} onSubmit={(values, formikHelpers) => {
                            values = {
                                ...values,
                                createdByName: `${user.given_name} ${user.family_name}`,
                                createdByImg: user.picture
                            }
                            addProduct({
                                variables: {
                                    data: values
                                }
                            })
                                .then(res => {
                                    const {data: {createProduct: resp}} = res
                                    if (Number(resp.code) === 201 && resp.success === true) {
                                        updateList()
                                        formikHelpers.resetForm()
                                        setAlertData({
                                            open: true,
                                            msg: "Producto agregado!",
                                            variant: "success"
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log('No se pudo agregar producto' + err)
                                })
                        }}>
                            {({values, errors, isSubmitting, isValidating}) => (
                                <Form autoComplete="off">
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="name" as={TextField} label="Nombre del producto"/>
                                            <ErrorMessage name="name"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="stock" type="number" as={TextField} label="Stock"/>
                                            <ErrorMessage name="stock"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="price" type="number" as={TextField} label="Precio"/>
                                            <ErrorMessage name="price"/>
                                        </FormGroup>
                                    </Box>
                                    <Box marginBottom={2}>
                                        <FormGroup>
                                            <Field name="image" type="text" as={TextField} label="URL de Imagen"/>
                                            <ErrorMessage name="image"/>
                                        </FormGroup>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={values.name === '' || isSubmitting || isValidating || Object.keys(errors).length > 0}>
                                        Crear
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

export default ProductsForm;