import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        screen_hint: "login",
      },
    });
  } catch (error) {
    res.status(error.status || 400).end(error.message);
  }
};

export default loginHandler;