export const getTokenAcess = () => {
  return JSON.parse(localStorage.getItem("token") || "{}");
};

export const removeToken = () => {
  return localStorage.removeItem("token");
};

export const setTokenAcess = (value: string) => {
  return localStorage.setItem("token", value);
};
