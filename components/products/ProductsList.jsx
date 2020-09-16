import {gql, useQuery} from '@apollo/client'
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import ProductMiddle from "./ProductMiddle";
import ProductsForm from "./ProductsForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import PaginationComponent from "../PaginationComponent";

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
                <ProductsForm user={user} refetch={refetch}/>
            </Grid>
            <Grid container item xs={12} sm={6} md={7} lg={10} spacing={1} className={classes.card}>
                {loading ?
                    <Grid item xs={12} sm={3}>
                        <CircularProgress/>
                    </Grid>
                    :
                    <>
                        <Grid item xs={12}>
                            <PaginationComponent totalPages={4}/>
                        </Grid>
                        {
                            data?.products.map((p, index) => (
                                <Grid key={index} item xs={12} sm={3}>
                                    <ProductMiddle {...p} refetch={refetch}/>
                                </Grid>))
                        }
                        <Grid item xs={12}>
                            <PaginationComponent totalPages={4}/>
                        </Grid>
                    </>
                }
            </Grid>
        </>
    )

}