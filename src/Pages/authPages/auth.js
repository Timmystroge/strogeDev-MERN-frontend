// password toggler function
const passwordToggler = (password, toggler) => {
  if (password.getAttribute("type") === "password") {
    password.setAttribute("type", "text");
    toggler.innerHTML = "Hide";
  } else if (password.getAttribute("type") === "text") {
    password.setAttribute("type", "password");
    toggler.textContent = "Show";
  }
};

const Notification = (notify, MSG, msg, action) => {
  if (action === "close") {
    notify.style.top = "-10rem";
  } else if (action === "show") {
    MSG.textContent = msg;
    notify.style.top = "0";
    // close notification after 2000 miliseconds
    setTimeout(() => {
      notify.style.top = "-10rem";
    }, 4000);
  }
};
export { passwordToggler as default, Notification };
