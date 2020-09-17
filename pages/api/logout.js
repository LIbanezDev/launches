import cookie from "cookie";

export default async function logout(req, res) {
    try {
        res.setHeader('Set-Cookie', cookie.serialize('authorization', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/'
        }))
        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}
