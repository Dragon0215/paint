const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool");

let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = "brush",
  prevMouseX,
  prevMouseY,
  snapshot;

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawRectangle = (e) => {
  ctx.strokeRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  switch (selectedTool) {
    case "brush":
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case "rectangle":
      drawRectangle(e);
      break;
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
  });
});

const stopDrawing = () => {
  isDrawing = false;
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
