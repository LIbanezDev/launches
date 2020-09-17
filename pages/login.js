import React from 'react';
import Layout from "../components/Layout";
import LoginC from "../components/tests_log/LoginC";
import {useFetchUser} from "../lib/user";

const Login = () => {
    const {user, loading} = useFetchUser()

    if (loading) return  <h2> .... </h2>

    if (user) return window.location = '/'

    return (
        <Layout user={user} loading={loading}>
            <LoginC />
        </Layout>
    );
};

export default Login;
