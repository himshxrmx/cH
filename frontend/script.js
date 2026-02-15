/* ============================= */
/* THEME TOGGLE */
/* ============================= */

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

/* ============================= */
/* DRAG & DROP UPLOAD */
/* ============================= */

const dropArea = document.getElementById("dropArea");
const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const loader = document.getElementById("loader");
const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("result");

if (dropArea) {

  function triggerFile() {
    input.click();
  }

  window.triggerFile = triggerFile;

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    }
  });

  dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("dragging");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragging");
  });

  dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("dragging");
    input.files = e.dataTransfer.files;
    preview.src = URL.createObjectURL(input.files[0]);
    preview.style.display = "block";
  });
}

/* ============================= */
/* FADE-UP ANIMATION FIX */
/* ============================= */

window.addEventListener("load", () => {
  document.querySelectorAll(".fade-up").forEach(el => {
    el.classList.add("show");
  });
});

/* ============================= */
/* FAKE ANALYZE (UI Demo Mode) */
/* ============================= */

function uploadImage() {

  if (!input.files.length) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", input.files[0]);

  loader.classList.remove("hidden");
  resultCard.classList.add("hidden");

  fetch("http://localhost:3000/analyze", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    loader.classList.add("hidden");
    resultCard.classList.remove("hidden");

    resultText.innerHTML = `
      Total Students: ${data.total_students}<br>
      Engaged: ${data.engaged}<br>
      Not Engaged: ${data.not_engaged}<br>
      Engagement %: ${data.engagement_percentage}
    `;
  })
  .catch(err => {
    loader.classList.add("hidden");
    console.error("Upload error:", err);
    alert("Error analyzing image");
  });
}




