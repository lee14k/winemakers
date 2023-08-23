import { handleLogin } from "@auth0/nextjs-auth0";

export default async function login(req, res) {
    try {
        await handleLogin(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
}
