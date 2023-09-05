//only run once
const canvas = document.body.appendChild(document.createElement("canvas"));
const debugCanvas = false; //will show the canvas on the page

if(debugCanvas){
    canvas.style.position = "absolute";
    // center
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = "translate(-50%, -50%)";
    // border
    canvas.style.border = "1px solid red";
}

// Convert react input into html input tag
const textInput = document.getElementsByClassName("input-message-input i18n scrollable scrollable-y no-scrollbar")[0];
const newTextInput = document.createElement("input");
newTextInput.className = textInput.className;
newTextInput.setAttribute("type", "text");
textInput.parentNode.replaceChild(newTextInput, textInput);

// Create a new canvas element

// Change the canvas size here
let resFactor = 30;
canvas.width = 16 * resFactor;
canvas.height = 9 * resFactor; 

// Get the 2D rendering context
const ctx = canvas.getContext("2d");

function textToFile(text) {
  // Set background color
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Set font and text properties
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Write the text on the canvas
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // Convert canvas to data URL
  const dataURL = canvas.toDataURL("image/png");

  // Convert data URL to blob
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  const fileName = "text_image.png";
  // Create a File object from the blob
  const file = new File([blob], fileName, { type: mimeString });

  // You can now use the 'file' object for further operations

  return file;
}

const inputElement = document.querySelector(
  "#column-center > div > div > div.chat-input > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper > input[type=file]"
);

function sendTextToImage(text) {
  const createdFile = textToFile(text);
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(createdFile);
  const event = new Event("change", {
    bubbles: true,
    cancelable: true,
  });
  inputElement.files = dataTransfer.files;
  inputElement.dispatchEvent(event);
  setTimeout(() => {
    const sendButton = document.querySelector("body > div.popup.popup-send-photo.popup-new-media.active > div > div.popup-input-container > button")
    sendButton.click();
    }, 30);
}


newTextInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendTextToImage(newTextInput.value);
        newTextInput.value = "";
    }
});

// sendTextToImage("Hello World");
