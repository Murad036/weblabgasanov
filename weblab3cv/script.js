
function toggleSection(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === 'none' || section.style.display === '' ? 'block' : 'none';
  }
  
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }
  
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    document.getElementById("clock").textContent = `${date} ${time}`;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  function addContent(sectionId, content) {
    const section = document.getElementById(sectionId);
    if (section) {
      const newElement = document.createElement("p");
      newElement.innerHTML = content;
      section.appendChild(newElement);
    }
  }
  