document.addEventListener('DOMContentLoaded', function() {
  const themetoggle = document.querySelector('.theme-toggle');
  themetoggle.addEventListener('click', toggletheme);

  document.querySelectorAll('.sidebar h2, .main h2').forEach(header => {
    header.addEventListener('click', function() {
      const sectionid = this.nextElementSibling.id;
      togglesection(sectionid);
    });
  });

  document.querySelectorAll('.add-controls button').forEach(button => {
    button.addEventListener('click', function() {
      const parentdiv = this.closest('.add-controls').previousElementSibling;
      const inputid = this.previousElementSibling.id;
      
      if (parentdiv.id === 'skills' || parentdiv.id === 'languages') {
        addlistitem(parentdiv.id, inputid);
      } else {
        addcontent(parentdiv.id, inputid);
      }
    });
  });

  // Save controls
  document.querySelector('.save-btn').addEventListener('click', savetolocalstorage);
  document.querySelector('.load-btn').addEventListener('click', loadfromlocalstorage);
  document.querySelector('.clear-btn').addEventListener('click', clearlocalstorage);

  // Initialize
  if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add("dark-mode");
  }

  loadfromlocalstorage();
  updateclock();
  setInterval(updateclock, 1000);
});

function toggletheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem('darkmode', document.body.classList.contains("dark-mode"));
}

function togglesection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.style.display = section.style.display === "block" ? "none" : "block";
  }
}

function addcontent(id, inputid) {
  const box = document.getElementById(id);
  const input = document.getElementById(inputid);
  const value = input.value.trim();

  if (value && box) {
    const p = document.createElement("p");
    p.textContent = value;
    box.appendChild(p);
    input.value = "";
    saveallcontent();
  }
}

function addlistitem(id, inputid) {
  const box = document.getElementById(id);
  const input = document.getElementById(inputid);
  const value = input.value.trim();

  if (value && box) {
    const list = box.querySelector("ul");
    if (list) {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
      input.value = "";
      saveallcontent();
    }
  }
}

function updateclock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  if (clock) {
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

function validatename(name) {
  return /^[a-zA-Z\s]+$/.test(name);
}

function validateemail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatedate(date) {
  return date !== "";
}

function validatedescription(desc) {
  return desc.length >= 10;
}

function savetolocalstorage() {
  const formdata = {
    name: document.getElementById("full-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    date: document.getElementById("birth-date").value,
    desc: document.getElementById("description").value.trim()
  };

  const isvalid = {
    name: validatename(formdata.name),
    email: validateemail(formdata.email),
    date: validatedate(formdata.date),
    desc: validatedescription(formdata.desc)
  };

  document.getElementById("name-error").style.display = isvalid.name ? "none" : "block";
  document.getElementById("email-error").style.display = isvalid.email ? "none" : "block";
  document.getElementById("date-error").style.display = isvalid.date ? "none" : "block";
  document.getElementById("desc-error").style.display = isvalid.desc ? "none" : "block";

  if (!Object.values(isvalid).every(v => v)) {
    alert("Sehv buraxma qardasim.");
    return;
  }

  localStorage.setItem('cvformdata', JSON.stringify(formdata));
  saveallcontent();
  alert("Saxlanıldı!");
}

function saveallcontent() {
  const sections = ['contact', 'education', 'skills', 'languages', 'profile', 'experience', 'reference'];
  const cvcontent = {};

  sections.forEach(section => {
    const element = document.getElementById(section);
    if (element) {
      if (section === 'skills' || section === 'languages') {
        cvcontent[section] = Array.from(element.querySelectorAll('li')).map(li => li.textContent);
      } else {
        cvcontent[section] = element.innerHTML;
      }
    }
  });

  localStorage.setItem('cvcontent', JSON.stringify(cvcontent));
}

function loadfromlocalstorage() {
  const savedformdata = localStorage.getItem('cvformdata');
  if (savedformdata) {
    const formdata = JSON.parse(savedformdata);
    document.getElementById("full-name").value = formdata.name || "";
    document.getElementById("email").value = formdata.email || "";
    document.getElementById("birth-date").value = formdata.date || "";
    document.getElementById("description").value = formdata.desc || "";
  }

  const savedcontent = localStorage.getItem('cvcontent');
  if (savedcontent) {
    const cvcontent = JSON.parse(savedcontent);
    
    Object.keys(cvcontent).forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        if (section === 'skills' || section === 'languages') {
          const list = element.querySelector('ul');
          if (list) {
            list.innerHTML = '';
            cvcontent[section].forEach(item => {
              const li = document.createElement('li');
              li.textContent = item;
              list.appendChild(li);
            });
          }
        } else {
          element.innerHTML = cvcontent[section];
        }
        element.style.display = "block";
      }
    });
  }
}

function clearlocalstorage() {
  if (confirm("Qaqam eminsen?")) {
    localStorage.clear();
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("birth-date").value = "";
    document.getElementById("description").value = "";
    
    ['contact', 'education', 'profile', 'experience', 'reference'].forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        element.innerHTML = '';
        element.style.display = "none";
      }
    });
    
    ['skills', 'languages'].forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const list = element.querySelector('ul');
        if (list) list.innerHTML = '';
        element.style.display = "none";
      }
    });
    
    alert("Təmizləndi QAQASS!");
  }
}