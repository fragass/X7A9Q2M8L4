const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

const tipo = document.getElementById("tipo")
const formReportar = document.getElementById("form-reportar")
const formSolicitar = document.getElementById("form-solicitar")
const popup = document.getElementById("popup")
const ok = document.getElementById("ok")

tipo.addEventListener("change", () => {
  formReportar.classList.add("hidden")
  formSolicitar.classList.add("hidden")

  if (tipo.value === "reportar") formReportar.classList.remove("hidden")
  if (tipo.value === "solicitar") formSolicitar.classList.remove("hidden")
})

formReportar.addEventListener("submit", async e => {
  e.preventDefault()

  await fetch(`${SUPABASE_URL}/rest/v1/tickets`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tipo: "reportar",
      titulo: titulo.value,
      episodio: episodio.value
    })
  })

  formReportar.reset()
  popup.classList.remove("hidden")
})

formSolicitar.addEventListener("submit", async e => {
  e.preventDefault()

  await fetch(`${SUPABASE_URL}/rest/v1/tickets`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tipo: "solicitar",
      nome: nome.value,
      descricao: descricao.value
    })
  })

  formSolicitar.reset()
  popup.classList.remove("hidden")
})

ok.onclick = () => popup.classList.add("hidden")
