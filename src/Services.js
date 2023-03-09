export const generateRequestId = () => {
  let d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const messageBox = function (type, message) {
  var typeClass = "";
  if (type === "danger") {
    typeClass = "portal-popup-danger";
  } else {
    typeClass = "portal-popup-success";
  }

  var dialog = document.createElement("div");
  dialog.innerHTML = message;
  dialog.style.display = "flex";
  dialog.style.flexDirection = "column";
  dialog.style.width = "470px";
  dialog.style.margin = "auto";
  dialog.style.padding = "15px";
  dialog.style.border = "1px solid #ccc";
  dialog.style.borderRadius = "4px";
  dialog.classList.add(typeClass);

  // Add the title element
  var title = document.createElement("h3");
  title.innerHTML = "Error!";
  title.style.color = "red";
  title.style.marginBottom = "4px";
  dialog.insertBefore(title, dialog.firstChild);

  var closeButton = document.createElement("button");
  closeButton.innerHTML = "Ok";
  closeButton.classList.add("btn", "btn-default");
  closeButton.style.margin = "auto";
  closeButton.style.marginTop = "10px";
  closeButton.addEventListener("click", function () {
    overlay.remove();
  });
  dialog.appendChild(closeButton);

  var overlay = document.createElement("div");
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.3)";
  overlay.style.zIndex = "9999";
  overlay.appendChild(dialog);

  document.body.appendChild(overlay);
  return false;
};
