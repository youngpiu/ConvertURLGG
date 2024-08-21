const btn = document.querySelector(".btn");
const url1Input = document.getElementById("url1");
const url2Input = document.getElementById("url2");
const pasteButtons = document.querySelectorAll(".btn-paste");

const toggleButtonState = () => {
  if (url1Input.value.trim() && url2Input.value.trim()) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

url1Input.addEventListener("input", toggleButtonState);
url2Input.addEventListener("input", toggleButtonState);

const sliceURL = (url) => {
  const cutIndex = url.indexOf("&range");
  const newUrl = cutIndex === -1 ? url : url.substring(0, cutIndex) + "&";
  return newUrl;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (btn.disabled) {
    return;
  }

  const url1 = url1Input.value.trim();
  const url2 = url2Input.value.trim();

  const newUrl1 = sliceURL(url1);
  const newUrl2 = sliceURL(url2);

  window.open(newUrl1, "_blank");

  setTimeout(() => {
    window.open(newUrl2, "_blank");
  }, 500);

  url1Input.value = "";
  url2Input.value = "";

  toggleButtonState();
});

// Xử lý sự kiện khi nhấn nút Paste
pasteButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetInput = document.getElementById(
      button.getAttribute("data-target")
    );

    try {
      const text = await navigator.clipboard.readText();
      targetInput.value = text;
      toggleButtonState();
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  });
});
