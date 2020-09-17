import { useState, useEffect } from 'react'
import {createApolloClient} from "./apolloClient";
import {gql} from "@apollo/client";
import {useRouter} from "next/router";

const apolloClient = createApolloClient()

export async function fetchUser(cookie = '') {

    if (typeof window !== 'undefined' && window.__user) {
        return window.__user
    }

    const {data:{me}} = await apolloClient.query({
        query: gql`
            query  {
                me {
                    success
                    user {
                        id
                        name
                        email
                        age
                        image
                        google
                        createdAtFormated
                        updatedAtFormated
                    }
                }
            }
        `
    })

    if(!me.success) {
        delete window.__user
        return null
    }

    if (typeof window !== 'undefined') {
        window.__user = me.user
    }

    return me.user
}

export function useFetchUser({ required } = {}) {
    const [loading, setLoading] = useState(
        () => !(typeof window !== 'undefined' && window.__user)
    )

    const {replace} = useRouter()

    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null
        }

        return window.__user || null
    })

    useEffect(
        () => {
            if (!loading && user) {
                return
            }
            setLoading(true)
            let isMounted = true

            fetchUser()
                .then((user) => {
                // Only set the user if the component is still mounted
                if (isMounted) {
                    // When the user is not logged in but login is required
                    if (required && !user) {
                        replace('/login')
                        return
                    }
                    setUser(user)
                    setLoading(false)
                }
            })

            return () => {
                isMounted = false
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return { user, loading }
}
