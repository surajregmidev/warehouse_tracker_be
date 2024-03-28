const deleteItemFun = ({ deleteItemSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    console.log("The user is : " + httpRequest.user);
    const Item = await deleteItemSer(httpRequest.user, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Item,
    };
  };
};

module.exports = deleteItemFun;
