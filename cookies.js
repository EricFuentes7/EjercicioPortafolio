// Función para generar una clave de cifrado
function generateKey() {
    return CryptoJS.lib.WordArray.random(16).toString(); // Genera una clave aleatoria de 128 bits
}

// Función para cifrar el valor de la cookie
function encryptData(key, data) {
    return CryptoJS.AES.encrypt(data, key).toString(); // Cifra el dato
}

// Función para descifrar el valor de la cookie
function decryptData(key, encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8); // Convierte de nuevo a texto
}

// Establecer una cookie cifrada
function setEncryptedCookie(name, value, days) {
    const key = generateKey(); // Generar clave para cifrar
    const encryptedValue = encryptData(key, value);
    
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = `${name}=${encryptedValue}${expires}; path=/`;
    
    // Guarda la clave en el almacenamiento local para desencriptar
    localStorage.setItem(name + "-key", key);
}

// Obtener y descifrar una cookie
function getDecryptedCookie(name) {
    const encryptedValue = getCookie(name);
    if (!encryptedValue) return null;

    const key = localStorage.getItem(name + "-key");
    return decryptData(key, encryptedValue);
}

// Función para obtener el valor de una cookie (sin desencriptar)
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// Verificar si las cookies ya fueron aceptadas
function checkCookies() {
    const decryptedValue = getDecryptedCookie("cookiesAccepted");
    return decryptedValue === "true"; // Compara el valor desencriptado
}

// Función para aceptar cookies y encriptar datos relevantes
async function acceptCookies() {
    await setEncryptedCookie("cookiesAccepted", "true", 365); // Cookies aceptadas

    const firstVisitDate = getCookie("fecha-primer-visita") || new Date().toISOString().split('T')[0];
    await setEncryptedCookie("fecha-primer-visita", firstVisitDate, 365);

    // Obtener la IP pública y guardarla en una cookie encriptada
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(async data => {
            const publicIP = data.ip;
            await setEncryptedCookie("usuario-ip", publicIP, 365);
        })
        .catch(error => console.error('Error al obtener la IP pública:', error));

    document.getElementById('cookie-banner').style.display = 'none';
    console.log("Cookies configuradas.");
}

// Mostrar el banner de cookies si no han sido aceptadas
function showCookieBanner() {
    const accepted = checkCookies(); // Verifica si las cookies han sido aceptadas
    const banner = document.getElementById('cookie-banner');

    banner.style.display = accepted ? 'none' : 'block'; // Muestra u oculta el banner
}

// Llama a esta función al cargar la página para mostrar el banner si es necesario
document.addEventListener('DOMContentLoaded', showCookieBanner);
