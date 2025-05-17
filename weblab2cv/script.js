function toggleSection(id) {
  var sec = document.getElementById(id);
  if (sec.style.display === "block") {
    sec.style.display = "none";
  } else {
    sec.style.display = "block";
  }
}

function addContent(id, inputId) {
  var box = document.getElementById(id);
  var inp = document.getElementById(inputId);
  var val = inp.value.trim();

  if (val) {
    var p = document.createElement("p");
    p.textContent = val;
    box.appendChild(p);
    inp.value = "";
  }
}

function addListItem(id, inputId) {
  var box = document.getElementById(id);
  var list = box.querySelector("ul");
  var inp = document.getElementById(inputId);
  var val = inp.value.trim();

  if (val) {
    var li = document.createElement("li");
    li.textContent = val;
    list.appendChild(li);
    inp.value = "";
  }
}
