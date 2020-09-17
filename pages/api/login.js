import cookie from 'cookie'
import {createApolloClient} from "../../lib/apolloClient";
import {gql} from "@apollo/client";

const apolloClient = createApolloClient()

export default async function login(req, res) {
    try {
        const body = JSON.parse(req.body) || null
        const {data:{login}} = await apolloClient.mutate({
            mutation: gql`
                mutation {
                    login(email: "${body.email}", password: "${body.pass}"){
                        success
                        token
                    }
                }
            `
        })
        if (login.success) {
            res.setHeader('Set-Cookie', cookie.serialize('authorization', login.token, {
                httpOnly: true,
                maxAge: 14400,
                path: '/'
            }))
            return res.json({ok:true, message:'Bienvenido a la aplicación'})
        }
        res.json({ok: false, message:'Contraseña incorrecta'})
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}
