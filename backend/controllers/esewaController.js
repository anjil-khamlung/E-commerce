import crypto from "crypto";

export const generateEsewaSignature = (req, res) => {
  const { total_amount, transaction_uuid, product_code } = req.body;

const secret = process.env.ESEWA_SECRET_KEY;

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const hash = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("base64");



  res.json({ signature: hash });
};
