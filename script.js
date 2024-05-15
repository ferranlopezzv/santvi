document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("header nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetSectionId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetSectionId);
            scrollToSection(targetSection);
        });
    });

    function scrollToSection(section) {
        window.scrollTo({
            top: section.offsetTop - 50,
            behavior: "smooth"
        });
    }
});
