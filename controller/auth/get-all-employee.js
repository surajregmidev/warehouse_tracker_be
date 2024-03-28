const selectEmployeeFun = ({ selectEmployeeSer }) => {
  return async function get(httpRequest) {
    const query = httpRequest.query;
    const id = httpRequest.params.id;
    const employees = await selectEmployeeSer(httpRequest.user, query, id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: employees,
    };
  };
};

module.exports = selectEmployeeFun;
