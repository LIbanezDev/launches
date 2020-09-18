import React from 'react';
import Layout from "../components/Layout";
import LoginC from "../components/auth/LoginC";
import {useFetchUser} from "../lib/user";
import Register from "../components/auth/Register";

const Login = () => {
    const {user, loading} = useFetchUser()

    if (loading) return  <h2> .... </h2>

    if (user) return window.location = '/'

    return (
        <Layout user={user} loading={loading}>
            <LoginC />
            <Register />
        </Layout>
    );
};

export default Login;
