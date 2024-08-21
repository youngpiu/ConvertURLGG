const btn = document.querySelector(".btn");
const url1Input = document.getElementById("url1");
const url2Input = document.getElementById("url2");

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

  // Mở URL đầu tiên ngay lập tức
  window.open(newUrl1, "_blank");

  // Mở URL thứ hai sau 1 giây
  setTimeout(() => {
    window.open(newUrl2, "_blank");
  }, 500);
  // Xóa dữ liệu đã nhập vào form
  url1Input.value = "";
  url2Input.value = "";
});
