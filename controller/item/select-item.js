const selectItemDFun = ({ selectItemSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const query = httpRequest.query;
    const Item = await selectItemSer(httpRequest.user, id, query);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Item,
    };
  };
};

module.exports = selectItemDFun;
