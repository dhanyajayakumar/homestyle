const getToken = async () => {
  try {
    const tokenLocal = localStorage.getItem("token");
    return tokenLocal;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

const UUID = async () => {
  try {
    const uniqueIdIS = localStorage.getItem("uniqueId");

    return uniqueIdIS;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export default { getToken, UUID };
