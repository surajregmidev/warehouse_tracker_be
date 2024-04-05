const updateBill = ({ updateBillSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const Item = await updateBillSer(httpRequest.user, id, model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Item,
    };
  };
};

module.exports = updateBill;
