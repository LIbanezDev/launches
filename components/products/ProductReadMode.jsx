import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {gql, useMutation} from "@apollo/client";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Link from "next/link";

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!){
        deleteProduct(id:$id){
            code
            success
            message
        }
    }
`;

const ProductReadMode = ({
                             id, name, stock, price, image, createdByName, createdByImg, createdAtFormated, updatedAtFormated,
                             setEditMode, setAlertData, refetch
                         }) => {

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const handleDeleteProduct = async () => {
        const {data: {deleteProduct: resp}} = await deleteProduct({
            variables: {
                id
            }
        })
        if (Number(resp.code) === 200 && resp.success === true) {
            refetch()
            setAlertData({
                open: true,
                msg: "Producto eliminado!",
                variant: "error"
            })
        }
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={image}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                    Stock: {stock} <br/> Price: {price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Created {createdAtFormated} <br/>
                    Edited {updatedAtFormated} <br/>
                    Owner {createdByName}
                </Typography>
                <Avatar style={{marginTop: "10px"}} alt="Lucas Vergara" src={createdByImg}/>
            </CardContent>
            <CardActions>
                <Button startIcon={<EditIcon/>} size="small" color="primary" onClick={() => setEditMode(true)}>
                    Editar
                </Button>
                <Button startIcon={<DeleteIcon/>} size="small" color="primary" onClick={handleDeleteProduct}>
                    Eliminar
                </Button>
                <Link href={`/products/${id}`}>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                </Link>
            </CardActions>
        </div>
    );
};

export default ProductReadMode;