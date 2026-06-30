import axios from "axios";

export const payWithEsewa = async (totalAmount) => {

  try {
    const transaction_uuid = `txn-${Date.now().toString()}`;
console.log("Total Amount:", totalAmount);

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/esewa/signature`,
    {
      total_amount: totalAmount,
      transaction_uuid,
      product_code: "EPAYTEST",
    },
  );

  

    const signature = res.data.signature;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const fields = {
      amount: totalAmount,
      tax_amount: 0,
      total_amount: totalAmount,
      transaction_uuid,
      product_code: "EPAYTEST",
      product_service_charge: 0,
      product_delivery_charge: 0,

      success_url: import.meta.env.VITE_ESEWA_SUCCESS_URL,
      failure_url: import.meta.env.VITE_ESEWA_FAILURE_URL,

      signed_field_names: "total_amount,transaction_uuid,product_code",

      signature,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    form.submit();
  } catch (error) {
    console.error(error);
    alert("Failed to start eSewa payment");
  }
};
