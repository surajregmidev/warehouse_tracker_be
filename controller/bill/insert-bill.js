const createBillFun = ({ createBillSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const Bill = await createBillSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Bill,
    };
  };
};

module.exports = createBillFun;
