import React from "react";
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../lib/apolloClient'
import {ThemeProvider} from '@material-ui/core/styles';
import Head from 'next/head';
import theme from '../utils/theme';
import {CssBaseline} from "@material-ui/core";
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Header from "../components/Header";

Router.events.on('routeChangeStart', () => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})
Router.events.on('routerChangeError', () => {
    NProgress.done()
})

export default function App({Component, pageProps}) {
    const apolloClient = useApollo(pageProps.initialApolloState)

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title> Index </title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <ApolloProvider client={apolloClient}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ApolloProvider>
            </ThemeProvider>
        </React.Fragment>
    )
}
