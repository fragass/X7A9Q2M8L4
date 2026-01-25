const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

const container = document.getElementById("tickets")

async function carregarTickets() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tickets?select=*`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    }
  })

  const dados = await res.json()

  dados.forEach(t => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <span class="${t.tipo}">${t.tipo.toUpperCase()}</span>
      <h3>${t.titulo || t.nome}</h3>
      <button class="expandir">+</button>
      <div class="detalhe hidden">
        <p>${t.episodio || t.descricao}</p>
      </div>
    `

    card.querySelector(".expandir").onclick = () => {
      card.querySelector(".detalhe").classList.toggle("hidden")
    }

    container.appendChild(card)
  })
}

carregarTickets()
