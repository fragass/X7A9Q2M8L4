const container = document.getElementById("tickets")

const popup = document.getElementById("popup")
const popupTitulo = document.getElementById("popupTitulo")
const popupTipo = document.getElementById("popupTipo")
const popupConteudo = document.getElementById("popupConteudo")
const fecharPopup = document.getElementById("fecharPopup")

async function carregarTickets() {
  const res = await fetch("/api/tickets")

  if (!res.ok) {
    console.error("Erro ao buscar tickets")
    return
  }

  const data = await res.json()

  container.innerHTML = ""

  data.forEach(t => {
    const card = document.createElement("div")
    card.className = "ticket-card"

    card.innerHTML = `
      <div>
        <span class="ticket-tipo ${t.tipo}">${t.tipo.toUpperCase()}</span>
        <div class="ticket-titulo">${t.titulo || t.nome}</div>
      </div>
      <button class="ticket-btn">+</button>
    `

    card.querySelector(".ticket-btn").addEventListener("click", () => {
      popupTitulo.textContent = t.titulo || t.nome
      popupTipo.textContent = t.tipo.toUpperCase()
      popupTipo.className = `ticket-tipo ${t.tipo}`
      popupConteudo.textContent = t.episodio || t.descricao
      popup.classList.add("show")
    })

    container.appendChild(card)
  })
}

fecharPopup.onclick = () => popup.classList.remove("show")

popup.onclick = e => {
  if (e.target === popup) popup.classList.remove("show")
}

carregarTickets()
