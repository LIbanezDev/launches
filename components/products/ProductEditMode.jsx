import React from 'react';
import {Avatar, Box, Button, CardActions, CardContent, CardMedia, FormGroup, TextField} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Field, Form, Formik} from 'formik';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";


const EDIT_PRODUCT = gql`
    mutation EditProduct($id: ID!, $data: ProductInput!) {
        updateProduct(id: $id, data:$data) {
            code
            success
            message
        }
    }
`;

const ProductEditMode = ({id, name, stock, price, image, createdByImg, setEditMode, setAlertData, refetch}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [updateProduct] = useMutation(EDIT_PRODUCT);

    return (
        <>
            <Formik
                initialValues={{name, stock, price}}
                onSubmit={(values, formikHelpers) => {
                    updateProduct({
                        variables: {
                            id,
                            data: values
                        }
                    })
                        .then(async res => {
                            await refetch()
                            enqueueSnackbar('Producto editado!', {variant:"success"})
                            setEditMode(false)
                        })
                }}>
                {({values, isSubmitting}) => (
                    <Form autoComplete="off">
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field name="name" type="text" as={TextField} label="Nombre"/>
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field name="stock" type="number" as={TextField} label="Stock"/>
                                </FormGroup>
                            </Box>
                            <Box marginBottom={2}>
                                <FormGroup>
                                    <Field name="price" type="number" as={TextField} label="Precio"/>
                                </FormGroup>
                            </Box>
                            <Avatar alt="Lucas Vergara" src={createdByImg}/>
                        </CardContent>
                        <CardActions>
                            <Button
                                type="submit"
                                startIcon={isSubmitting ? <CircularProgress size={24} /> : <SaveIcon/>}
                                size="small"
                                color="primary"
                                disabled={
                                    isSubmitting ||
                                    (name === values.name &&
                                    stock === values.stock &&
                                    price === values.price)
                                }
                            >
                                 Guardar
                            </Button>
                            <Button
                                startIcon={<CancelIcon/>}
                                size="small"
                                color="primary"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                        </CardActions>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ProductEditMode;