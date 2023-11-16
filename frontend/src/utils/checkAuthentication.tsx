export const checkAuthentication = () => {
  const userId = localStorage.getItem("id");

  if (!userId) {
    window.location.href = "/";
  }
};
