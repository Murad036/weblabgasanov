// tema dəyişimi
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// bölməni göstər/gizlət
function toggleSection(id) {
  const sec = document.getElementById(id);
  if (sec.style.display === "block") {
    sec.style.display = "none";
  } else {
    sec.style.display = "block";
  }
}

// paraqraf əlavə et
function addContent(id, inputId) {
  const box = document.getElementById(id);
  const inp = document.getElementById(inputId);
  const val = inp.value.trim();

  if (val) {
    const p = document.createElement("p");
    p.textContent = val;
    box.appendChild(p);
    inp.value = "";
  }
}

// siyahı elementini əlavə et
function addListItem(id, inputId) {
  const box = document.getElementById(id);
  const list = box.querySelector("ul");
  const inp = document.getElementById(inputId);
  const val = inp.value.trim();

  if (val) {
    const li = document.createElement("li");
    li.textContent = val;
    list.appendChild(li);
    inp.value = "";
  }
}

// saat funksiyası
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const time = `${h}:${m}:${s}`;

  const clock = document.getElementById("clock");
  if (clock) {
    clock.textContent = time;
  }
}

// saatı hər saniyə yenilə
setInterval(updateClock, 1000);
updateClock();
