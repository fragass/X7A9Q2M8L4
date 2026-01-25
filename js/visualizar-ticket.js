const container = document.getElementById("tickets")

async function carregar() {
  const res = await fetch("/api/tickets")
  const data = await res.json()

  data.forEach(t => {
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

carregar()
