const createItemFun = ({ createItemSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const Item = await createItemSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Item,
    };
  };
};

module.exports = createItemFun;
