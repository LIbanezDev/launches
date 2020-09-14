import React from 'react';
import Header from "./Header";
import Grid from "@material-ui/core/Grid";

const Layout = ({user, loading = false, children}) => {
    return (
        <>
            <Header user={user} loading={loading} />
            <main>
                <Grid container>
                    {children}
                </Grid>
            </main>
        </>
    );
};

export default Layout;