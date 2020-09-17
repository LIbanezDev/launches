import React from 'react';
import Layout from "../components/Layout";
import {useFetchUser} from "../lib/user";
import Users from "../components/chat/Users";


const Chat = () => {
    const {user, loading} = useFetchUser({required: true})

    return (
        <Layout user={user} loading={loading}>
            {!loading && <Users user={user} /> }
        </Layout>
    );
};

export default Chat;
