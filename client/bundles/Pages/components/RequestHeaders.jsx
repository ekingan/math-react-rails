import axios from "axios";

const setRequestHeaders = () => {
  const csrfToken = document.querySelector("[name=csrf-token]");
  if (!csrfToken) {
    return;
  }
  const csrfTokenContent = csrfToken.content;
  csrfTokenContent &&
    (axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfTokenContent);
};

export default setRequestHeaders;