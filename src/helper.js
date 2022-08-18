const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch {
    return;
  }
};

export { getToken };
