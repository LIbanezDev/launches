import React from 'react';
import {useFetchUser} from "../lib/user";
import Layout from "../components/Layout";

const Index = () => {
    const { user, loading } = useFetchUser()

    return (
        <Layout user={user} loading={loading}>
            {loading && <p>Loading login info...</p>}
            {!loading && !user && (
                <>
                    <h2> Bienvenido! </h2>
                </>
            )}
            {user && <pre style={{fontSize:"2rem"}}> {JSON.stringify(user, null, 4)}</pre>}
        </Layout>
    );
};

export default Index;
