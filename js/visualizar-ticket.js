const container = document.getElementById("tickets")

const popup = document.getElementById("popup")
const popupTitulo = document.getElementById("popupTitulo")
const popupTipo = document.getElementById("popupTipo")
const popupConteudo = document.getElementById("popupConteudo")
const fecharPopup = document.getElementById("fecharPopup")

async function carregar() {
  const res = await fetch("/api/tickets")
  const data = await res.json()

  container.innerHTML = ""

  data.forEach(t => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <span class="${t.tipo}">${t.tipo.toUpperCase()}</span>
      <h3>${t.titulo || t.nome}</h3>
      <button class="expandir">+</button>
    `

    card.querySelector(".expandir").addEventListener("click", () => {
      popupTitulo.textContent = t.titulo || t.nome
      popupTipo.textContent = t.tipo.toUpperCase()
      popupTipo.className = t.tipo
      popupConteudo.textContent = t.episodio || t.descricao

      popup.classList.add("show")
    })

    container.appendChild(card)
  })
}

fecharPopup.addEventListener("click", () => {
  popup.classList.remove("show")
})

popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("show")
})

carregar()
