function inicializarMapa() {
  fetch("https://script.google.com/macros/s/AKfycbw61SP8l3dO_oFW6QjR5EPkqUKiZ-1YmklMOFj4qGMwULsNbn5CovTm2XL9KjIKyCrmUA/exec")
    .then(r => r.json())
    .then(data => {

      document.querySelectorAll("#mapa path").forEach(p => {
        if (data[p.id]) {
          p.style.fill = "orange";
          p.style.cursor = "pointer";

          p.onclick = () => {
            document.getElementById("contador").innerHTML = `
              <div class="tarjeta">
                <div class="nombre">${p.id.toUpperCase()}</div>
                <div class="numero">Empresas: ${data[p.id].empresas}</div>
                <div class="nota">Colaboraciones: ${data[p.id].colaboraciones}</div>
              </div>`;
          };
        } else {
          p.style.fill = "#ccc";
        }
      });

    });
}
