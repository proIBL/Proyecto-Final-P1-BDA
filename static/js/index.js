function updatemap() {
    alert("¡Hola! Has hecho clic en el botón.");
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
