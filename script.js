const modal = document.getElementById("privacyModal");
const link = document.getElementById("privacyLink");
const closeModal = document.getElementById("closeModal");

link.onclick = function(event) {
    event.preventDefault(); // Previene el comportamiento del enlace
    modal.style.display = "block"; // Muestra el modal
}

closeModal.onclick = function() {
    modal.style.display = "none"; // Cierra el modal
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Cierra el modal si se hace clic fuera
    }
}
