export const getCookie = (key) => {
  let cookieName = document?.cookie?.match(
    "(^|;)\\s*" + key + "\\s*=\\s*([^;]+)",
  );
  return cookieName ? cookieName.pop() : "";
};
