function playSound() {
  var audio = document.getElementById("audio");
  audio.pause(); // Pausar el audio si está reproduciéndose
  audio.currentTime = 0; // Reiniciar el tiempo a 0
  audio.play().catch(error => {
      console.error("Error al reproducir el sonido: ", error);
  });
}

function playSound2() {
  var audio = document.getElementById("audio2");
  audio.pause(); // Pausar el audio si está reproduciéndose
  audio.currentTime = 0; // Reiniciar el tiempo a 0
  audio.play().catch(error => {
      console.error("Error al reproducir el sonido: ", error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const originalBaseSrc = '/TBOI/images/charactermenu.png';
  const newBaseSrc = '/TBOI/images/charactermenu2.png';

  const originalIconSrc = '/TBOI/images/icon.png';
  const newIconSrc = '/TBOI/images/icon2.png';

  const originalDescSrc = '/TBOI/images/intro/desc.png';
  const newDescSrc = '/TBOI/images/intro/desc2.png';

  const baseSM = document.getElementById('baseSM');
  const iconoSM = document.getElementById('iconoSM');
  const descripcionSM = document.getElementById('descripcionSM');

  // Función para cambiar las imágenes
  function changeImages() {
      baseSM.src = newBaseSrc;
      iconoSM.src = newIconSrc;
      descripcionSM.src = newDescSrc;

      // Después de 200 milisegundos, revertir a las imágenes originales
      setTimeout(() => {
          baseSM.src = originalBaseSrc;
          iconoSM.src = originalIconSrc;
          descripcionSM.src = originalDescSrc;
      }, 200);
  }

  // Cambiar imágenes cada 8 segundos
  setInterval(changeImages, 8000);
});
