import cookie from 'cookie'
import {createApolloClient} from "../../lib/apolloClient";
import {gql} from "@apollo/client";
const apolloClient = createApolloClient()

export default async function me(req, res) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '')
        if (cookies.authorization) {
            const {data:{me:responseGraph}} = await apolloClient.query({
                context: {
                  headers: {
                      authorization: cookies.authorization
                  }
                },
                query: gql`
                    query {
                        me {
                            message
                            code
                            success
                            user {
                                id
                                name
                                email
                                age
                                createdAt
                                createdAtFormated
                                google
                                image
                                updatedAtFormated
                            }
                        }
                    }
                `
            })
            return res.json(responseGraph.user)
        } else {
            throw {status:403, message:"No hay autenticación"}
        }
    } catch (error) {
        res.status(error.status || 500).end(error.message)
    }
}
