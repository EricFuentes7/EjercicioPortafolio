// Mostrar l'estat de l'usuari en carregar la pàgina
window.onload = () => {
    showCookieBanner(); // Mostra el bàner de cookies
    checkUserStatus(); // Actualitza l'estat de l'usuari en carregar la pàgina

    // Configurar el botó per mostrar el modal d'inici de sessió
    document.getElementById("admin-toggle2").addEventListener("click", async () => {
        const userType = await getUserType();
        if (userType === "admin") {
            resetUserType(); // Canvia a anònim
        } else {
            document.getElementById("loginModal2").style.display = "block"; // Mostra el modal de login
        }
    });

    // Tancar el modal en fer clic a la "X"
    document.getElementById("closeLoginModal2").onclick = function() {
        document.getElementById("loginModal2").style.display = "none";
    };

    // Tancar el modal si es fa clic fora del contingut
    window.onclick = function(event) {
        if (event.target === document.getElementById("loginModal2")) {
            document.getElementById("loginModal2").style.display = "none";
        }
    };

    // Gestionar l'enviament del formulari
    document.getElementById("loginForm2").onsubmit = handleLoginFormSubmission;
};

// Funció per restablir el tipus d'usuari (esborrar la galeta i actualitzar l'estat)
async function resetUserType() {
    await setEncryptedCookie("userType", "anònim", 365); // Canvia la galeta a "anònim"
    deleteUserTypeCookie(); // Esborra la galeta de l'usuari

    // Envia una sol·licitud al servidor per eliminar la sessió d'admin
    fetch("/set_admin_session.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userType: "anònim" })
    }).then(() => {
        checkUserStatus(); // Actualitza l'estat de l'usuari a "anònim"
    });
}

// Funció per esborrar la galeta del tipus d'usuari
function deleteUserTypeCookie() {
    document.cookie = "userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Esborra la galeta
}

// Funció per gestionar el tipus d'usuari
async function setUserType(userType) {
    await setEncryptedCookie("userType", userType, 365); // Desa el tipus d'usuari xifrat
}

async function getUserType() {
    return await getDecryptedCookie("userType") || "anònim"; // Retorna "anònim" si no s'ha establert
}

async function checkUserStatus() {
    const userType = await getUserType();
    document.getElementById("usernameDisplay2").innerText = userType;

    // Canviar el text i la funcionalitat del botó segons l'estat de l'usuari
    const adminToggle = document.getElementById("admin-toggle2");
    adminToggle.innerText = userType === "admin" ? "Tornar a anònim" : "Ets admin?";
}

// Funció per gestionar l'enviament del formulari
async function handleLoginFormSubmission(event) {
    event.preventDefault(); // Prevenir el comportament per defecte del formulari
    const username = document.getElementById("username2").value;
    const password = document.getElementById("password2").value;

    // Validació de credencials
    if (username.trim() === "admin" && password.trim() === "password") {
        await setUserType("admin"); // Desa a la galeta
        checkUserStatus(); // Actualitza l'estat de l'usuari
        
        // Envia una sol·licitud al servidor per establir la sessió com a administrador
        fetch("/set_admin_session.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userType: "admin" })
        }).then(() => {
            document.getElementById("loginModal2").style.display = "none"; // Tancar modal
        });
    } else {
        alert("Credencials incorrectes.");
    }
}

// Gestió de la combinació de tecles per accés admin
let keySequence = [];
const adminKeyCombination = ["a", "a", "7", "3"];

window.addEventListener("keydown", async function (event) {
    keySequence.push(event.key);
    if (keySequence.length > adminKeyCombination.length) {
        keySequence.shift();
    }

    // Compareu la seqüència de tecles actual amb la combinació
    if (keySequence.join(",") === adminKeyCombination.join(",")) {
        const userType = await getUserType();
        if (userType === "admin") {
            // Redirigir l'usuari admin a la pàgina de missatges
            window.location.href = "/DATABASE/view_messages.php";
        } else {
            alert("No tens permisos per entrar en aquesta pàgina.");
        }
    }
});
