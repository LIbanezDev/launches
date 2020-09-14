import {gql, useQuery} from '@apollo/client'
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Products from "./Products";
import ProductsForm from "./ProductsForm";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    card: {
        height: "50"
    },
    inline: {
        display: 'inline',
    },
}));

export const ALL_PRODUCTS_QUERY = gql`
    query getProducts {
        products {
            id
            name
            stock
            price
            image
            createdByName
            createdByImg
            createdAtFormated
            updatedAtFormated
        }
    }
`

export default function ProductsList({user}) {

    const classes = useStyles();

    const {loading, data, refetch} = useQuery(ALL_PRODUCTS_QUERY)


    return (
        <>
            <Grid item xs={12} sm={6} md={5} lg={2}>
                <ProductsForm user={user} updateList={refetch}/>
            </Grid>
            <Grid container item xs={12} sm={6} md={7} lg={10} spacing={1} className={classes.card}>
                {loading ?
                    <Grid item xs={12} sm={3}>
                        <CircularProgress/>
                    </Grid>
                    :
                    data?.products.map((p, index) => (
                        <Grid key={index} item xs={12} sm={3}>
                            <Products {...p} refetch={refetch}/>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )

}