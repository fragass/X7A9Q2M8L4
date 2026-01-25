document.addEventListener("DOMContentLoaded", () => {

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

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

formReportar.addEventListener("submit", async e => {
  e.preventDefault()

  await fetch(`${SUPABASE_URL}/rest/v1/tickets`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({
      tipo: "reportar",
      titulo: titulo.value,
      episodio: episodio.value
    })
  })

  formReportar.reset()
  popup.classList.add("show")
})

formSolicitar.addEventListener("submit", async e => {
  e.preventDefault()

  await fetch(`${SUPABASE_URL}/rest/v1/tickets`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({
      tipo: "solicitar",
      nome: nome.value,
      descricao: descricao.value
    })
  })

  formSolicitar.reset()
  popup.classList.add("show")
})

ok.addEventListener("click", () => {
  popup.classList.remove("show")
})

})
