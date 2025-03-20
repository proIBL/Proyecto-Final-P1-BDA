function updatemap() {

  const dataToSend = {
    magnitude_start: document.getElementById("magnitude_start").value,
    magnitude_end: document.getElementById("magnitude_end").value,
    depth_start: document.getElementById("depth_start").value,
    depth_end: document.getElementById("depth_end").value
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend)
  };

  fetch('/update_image', requestOptions)
    .then(response => response.blob())
    .then(blob => {
        document.getElementById("map").src = URL.createObjectURL(blob);
    })
    .catch(error => console.error('Error:', error));
}

function limitarRango(input, minimo, maximo) {
    let valor = input.value;
    input.value = Math.min(Math.max(valor, minimo), maximo);
}

document.getElementById("magnitude_start").addEventListener("input", function () {
    limitarRango(this, parseFloat(this.min), parseFloat(this.max));
});

document.getElementById("magnitude_end").addEventListener("input", function () {
    limitarRango(this, parseFloat(this.min), parseFloat(this.max));
});


document.getElementById("depth_start").addEventListener("input", function () {
    limitarRango(this, parseInt(this.min), parseInt(this.max));
});

document.getElementById("depth_end").addEventListener("input", function () {
    limitarRango(this, parseInt(this.min), parseInt(this.max));
});
