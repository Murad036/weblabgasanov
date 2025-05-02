function toggleSection(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === 'none' || section.style.display === '' ? 'block' : 'none';
  }
  
  function updateCV() {
    const profileText = document.getElementById("profileText").value;
    const contactText = document.getElementById("contactText").value;
    const skillsText = document.getElementById("skillsText").value;
  
    // Update CV profile text
    document.getElementById("profile").innerHTML = `<p>${profileText}</p>`;
    document.getElementById("contact").innerHTML = `<p>${contactText}</p>`;
    document.getElementById("skills").innerHTML = `<ul><li>${skillsText}</li></ul>`;
  }
  