const createEmployeeFun = ({ createEmployeeSer }) => {
  return async function get(httpRequest) {
    const { email, password, role, fullName } = httpRequest.body;
    const user = await createEmployeeSer({ email, password, role, fullName });

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = createEmployeeFun;
