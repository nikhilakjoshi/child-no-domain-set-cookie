import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  samlToken?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });
  //add 2 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res
    .status(200)
    .json({ message: `success - ${new Date().getTime().toString(36)}` });
}
