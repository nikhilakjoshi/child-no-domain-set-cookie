import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
type ResponseData = {
  samlToken?: string;
  message?: string;
};

// const rand = function () {
//   return Math.random().toString(36).substr(2); // remove `0.`
// };

// const token = function () {
//   return rand() + rand(); // to make it longer
// };

const cors = Cors({
  methods: ["GET", "HEAD", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  origin: ["https://onlineaccess.bluebuckdesigns.xyz", "http://localhost:3000"],
  credentials: true,
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: typeof cors,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });
  runMiddleware(req, res, cors);
  //add 2 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.setHeader(
    "Set-Cookie",
    `token=${new Date().getTime().toString(36)};HttpOnly;SameSite=None;Secure;`,
  );
  res.status(200).send({ message: "success" });
}
