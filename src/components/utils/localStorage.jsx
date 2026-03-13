const admin = [
  {
    id: 1,
    Username: "testuser",
    Password: "Test123",
  },
];
export const setLocalStorage = () => {
  localStorage.setItem("admin", JSON.stringify(admin));
};
export const getLocalStorage = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return { admin };
};
