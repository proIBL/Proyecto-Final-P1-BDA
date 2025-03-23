function updatemap() {

  const dataToSend = {
    magnitude_start: parseFloat(document.getElementById("magnitude_start").value),
    magnitude_end: parseFloat(document.getElementById("magnitude_end").value),
    depth_start: parseInt(document.getElementById("depth_start").value),
    depth_end: parseInt(document.getElementById("depth_end").value)
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

function limitarRangoFloat(input, minimo, maximo) {
    let valor = Number(input.value);
    input.value = Math.min(Math.max(valor, minimo), maximo);
}

function limitarRangoInt(input, minimo, maximo) {
    let valor = Number(input.value);
    input.value = Math.min(Math.max(valor, minimo), maximo);
}

document.getElementById("magnitude_start").addEventListener("blur", function () {
    limitarRangoFloat(this, parseFloat(this.min), parseFloat(this.max));
});

document.getElementById("magnitude_end").addEventListener("blur", function () {
    limitarRangoFloat(this, parseFloat(this.min), parseFloat(this.max));
});


document.getElementById("depth_start").addEventListener("blur", function () {
    limitarRangoInt(this, parseInt(this.min), parseInt(this.max));
});

document.getElementById("depth_end").addEventListener("blur", function () {
    limitarRangoInt(this, parseInt(this.min), parseInt(this.max));
});
