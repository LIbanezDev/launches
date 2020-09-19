import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import ProductMiddle from "./ProductMiddle";
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


export default function ProductsList({user, data, loading, refetch}) {

    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={5} lg={2} style={{marginRight: "6px"}}>
                <ProductsForm user={user} refetch={refetch}/>
            </Grid>
            <Grid container item xs={12} sm={6} md={7} lg={10} spacing={1} className={classes.card}>
                {loading ?
                    <Grid item xs={12} sm={3}>
                        <CircularProgress/>
                    </Grid>
                    :
                    data?.products.map((p, index) => (
                        <Grid key={index} item xs={12} sm={3}>
                            <ProductMiddle {...p} refetch={refetch}/>
                        </Grid>))
                }
            </Grid>
        </>
    )

}
