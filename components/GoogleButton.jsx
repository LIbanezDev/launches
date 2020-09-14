import React from 'react';
import GoogleLogin from 'react-google-login';
import {gql, useMutation} from "@apollo/client";

const LOGIN_GOOGLE_MUTATION = gql`
    mutation loginWithGoogle($tokenId:String!) {
                loginGoogle(token:$tokenId) {
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

    const responseGoogle = response => {
        loginGoogle({
            variables: { tokenId:response.tokenId }
        })
            .then(({data}) => onSuccess({
                logged:true,
                ...data.loginGoogle
            }))
            .catch(err => console.log(err))
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