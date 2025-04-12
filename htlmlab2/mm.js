function toggleSection(id) {
    // Bütün bölmələri alırıq
    const sections = document.querySelectorAll('.toggle-content');
    
    // Hər bir bölməni yoxlayırıq və açıq olanı bağlayırıq
    sections.forEach(section => {
        if (section.id !== id) {
            section.classList.remove("active");
            section.style.backgroundColor = ""; // Əvvəlki fonu sıfırlayırıq
        }
    });

    // Aktiv olan bölməni açırıq
    const section = document.getElementById(id);
    section.classList.toggle("active");

    // Fon rəngini dəyişdirmək
    if (section.classList.contains("active")) {
        section.style.backgroundColor = "black"; // Qara fon
    } else {
        section.style.backgroundColor = ""; // Əvvəlki fon rənginə qaytar
    }
}
