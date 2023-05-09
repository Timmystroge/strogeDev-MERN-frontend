const UserAuth = () => {
  const userID = sessionStorage.getItem("id");
  return userID;
};

export { UserAuth as default };
