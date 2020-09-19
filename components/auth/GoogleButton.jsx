import React from 'react';
import GoogleLogin from 'react-google-login';
import {gql, useMutation} from "@apollo/client";
import {useSnackbar} from "notistack";

const LOGIN_GOOGLE_MUTATION = gql`
    mutation loginWithGoogle($token:String!) {
                loginGoogle(token:$token) {
                    message
                    success
                    code
                    token
                    user {
                        id
                        name
                        email
                        image
                        google
                        createdAtFormated
                    }
                }
            }
            `

const GoogleButton = ({onSuccess}) => {
    const [loginGoogle, { loading }] = useMutation(LOGIN_GOOGLE_MUTATION)
    const {enqueueSnackbar} = useSnackbar();

    const responseGoogle = async response => {
        const {data:{loginGoogle:res}} = await loginGoogle({
            variables: { token:response.tokenId }
        })
        if (res.success) {
            enqueueSnackbar('Bienvenido a la aplicación!', {
                variant: 'success'
            })
            localStorage.setItem('token', res.token)
            window.location = '/'
        } else {
            enqueueSnackbar('Contraseña incorrecta', {
                variant: 'error'
            })
        }
    }
    return (
        <GoogleLogin
            clientId="765873503687-hj0uhcv5amioitojudtdj2fn1nane9og.apps.googleusercontent.com"
            buttonText="Entrar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        >
        </GoogleLogin>
    );
};

export default GoogleButton;
