function updatemap() {

  const dataToSend = {
    magnitude_start: document.getElementById("magnitude").value === 'N.E.' ? false : parseFloat(document.getElementById("magnitude_start").value),
    magnitude_end: document.getElementById("magnitude").value === 'N.E.' ? false : parseFloat(document.getElementById("magnitude_end").value),
    depth_start: document.getElementById("depth").value === 'N.E.' ? false : parseInt(document.getElementById("depth_start").value),
    depth_end: document.getElementById("depth").value === 'N.E.' ? false : parseInt(document.getElementById("depth_end").value),
    soil_texture : document.getElementById("soil_texture").value === 'N.E.' ? false : document.getElementById("soil_texture").value,
    textural_class : document.getElementById("textural_class").value === 'N.E.' ? false : document.getElementById("textural_class").value,
    physical_phase : document.getElementById("physical_phase").value === 'N.E.' ? false : document.getElementById("physical_phase").value,
    chemical_phase : document.getElementById("chemical_phase").value === 'N.E.' ? false : document.getElementById("chemical_phase").value,
    DA_start: document.getElementById("depth").value === 'N.E.' ? false : parseFloat(document.getElementById("DA_start").value),
    DA_end: document.getElementById("depth").value === 'N.E.' ? false : parseFloat(document.getElementById("DA_end").value),
    topoform : document.getElementById("topoform").value === 'N.E.' ? false : document.getElementById("topoform").value,
    relief : document.getElementById("relief").value === 'N.E.' ? false : document.getElementById("relief").value,
    soil_erosion : document.getElementById("soil_erosion").value === 'N.E.' ? false : document.getElementById("soil_erosion").value,
    outcrop : document.getElementById("outcrop").value === 'N.E.' ? false : document.getElementById("outcrop").value,
    physiographic_province : document.getElementById("physiographic_province").value === 'N.E.' ? false : document.getElementById("physiographic_province").value,
    Grad_pend_start: document.getElementById("Grad_pend").value === 'N.E.' ? false : parseFloat(document.getElementById("Grad_pend_start").value),
    Grad_pend_end: document.getElementById("Grad_pend").value === 'N.E.' ? false : parseFloat(document.getElementById("Grad_pend_end").value),
  };
  console.log(dataToSend)
  /*
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

  */
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

document.getElementById("DA").addEventListener("change", function () {
    const container = document.getElementById("DA_container");
    container.style.display = this.value === "Elegir" ? "flex" : "none";
});

document.getElementById("Grad_pend").addEventListener("change", function () {
    const container = document.getElementById("Grad_pend_container");
    container.style.display = this.value === "Elegir" ? "flex" : "none";
});

document.getElementById("magnitude").addEventListener("change", function () {
    const container = document.getElementById("magnitude_container");
    container.style.display = this.value === "Elegir" ? "flex" : "none";
});

document.getElementById("depth").addEventListener("change", function () {
    const container = document.getElementById("depth_container");
    container.style.display = this.value === "Elegir" ? "flex" : "none";
});