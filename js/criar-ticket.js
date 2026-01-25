document.addEventListener("DOMContentLoaded", () => {

  const tipo = document.getElementById("tipo")
  const formReportar = document.getElementById("form-reportar")
  const formSolicitar = document.getElementById("form-solicitar")
  const popup = document.getElementById("popup")
  const ok = document.getElementById("ok")

  tipo.addEventListener("change", () => {
    formReportar.style.display = "none"
    formSolicitar.style.display = "none"

    if (tipo.value === "reportar") formReportar.style.display = "block"
    if (tipo.value === "solicitar") formSolicitar.style.display = "block"
  })

  formReportar.addEventListener("submit", async (e) => {
    e.preventDefault()

    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "reportar",
        titulo: titulo.value,
        episodio: episodio.value
      })
    })

    formReportar.reset()
    popup.classList.add("show")
  })

  formSolicitar.addEventListener("submit", async (e) => {
    e.preventDefault()

    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "solicitar",
        nome: nome.value,
        descricao: descricao.value
      })
    })

    formSolicitar.reset()
    popup.classList.add("show")
  })

  ok.onclick = () => popup.classList.remove("show")

})
