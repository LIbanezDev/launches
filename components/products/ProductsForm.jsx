import React from "react";
import {Box, Button, Card, CardContent, FormGroup, TextField, Typography} from '@material-ui/core';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {number, object, string} from 'yup';
import {gql, useMutation} from '@apollo/client';
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadIcon from "@material-ui/icons/CloudUpload";
import {useSnackbar} from "notistack";
import UploadFile from "../UploadFile";


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

const ProductsForm = ({user, refetch}) => {
    const [addProduct] = useMutation(ADD_PRODUCT)

    const {enqueueSnackbar} = useSnackbar()

    return (
        <>
            <div className="animate__animated animate__fadeIn">
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
                            initialValues={initialValues} onSubmit={async (values, formikHelpers) => {
                            values = {
                                ...values,
                                createdByName: `${user.name} `,
                                createdByImg: user.image
                            }
                            try {
                                const {data: {createProduct: resp}} = await addProduct({
                                    variables: {
                                        data: values
                                    }
                                })
                                if (Number(resp.code) === 201 && resp.success === true) {
                                    await refetch()
                                    formikHelpers.resetForm()
                                    formikHelpers.setErrors({})
                                    enqueueSnackbar('Producto agregado', {variant: "success"})
                                }
                            } catch (e) {
                                console.log("No se pudo agregar producto - error + " + e)
                            }
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
                                        startIcon={isSubmitting ? <CircularProgress size={24}/> : <UploadIcon/>}
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
