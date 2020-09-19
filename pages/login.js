import React from 'react';
import Layout from "../components/Layout";
import LoginC from "../components/auth/LoginC";
import {useFetchUser} from "../lib/user";
import Register from "../components/auth/Register";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";

const Login = () => {
    const {user, loading} = useFetchUser()

    return (
        <React.Fragment>
            <Head>
                <title> LV - Login </title>
            </Head>
            <Layout user={user} loading={loading}>
                <Grid container spacing={1} style={{margin: "5px"}}>
                    <Grid item xs={12} sm={6}>
                        <LoginC/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Register/>
                    </Grid>
                </Grid>
            </Layout>
        </React.Fragment>
    );
};

export default Login;
