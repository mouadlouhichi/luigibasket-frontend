import { getSessionFromTempCookie, setAuthCookie } from "@/server/common/cookie";
import { NextApiRequest, NextApiResponse } from "next";


export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.query.token as string;

  const session = await getSessionFromTempCookie(req);

  if (session) {
    setAuthCookie(session, res);
  }

  res.redirect("/");
}
