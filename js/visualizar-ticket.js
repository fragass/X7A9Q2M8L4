const container = document.getElementById("tickets");

const popup = document.getElementById("popup");
const popupTitulo = document.getElementById("popupTitulo");
const popupTipo = document.getElementById("popupTipo");
const popupConteudo = document.getElementById("popupConteudo");
const fecharPopup = document.getElementById("fecharPopup");

container.innerHTML = "<p class='loading'>Carregando tickets...</p>";

function formatarData(dataISO) {
  if (!dataISO) return "Sem data";

  const d = new Date(dataISO);

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();

  const hora = String(d.getHours()).padStart(2, "0");
  const minuto = String(d.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}

async function carregarTickets() {
  try {
    const res = await fetch("/api/tickets");
    if (!res.ok) throw new Error("Erro ao buscar tickets");

    const data = await res.json();
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p class='empty'>Nenhum ticket encontrado.</p>";
      return;
    }

    data.forEach(t => {
      const card = document.createElement("div");
      card.className = "ticket-card";

      const dataFormatada = formatarData(t.created_at);

      card.innerHTML = `
        <div>
          <span class="ticket-tipo ${t.tipo}">${t.tipo.toUpperCase()}</span>
          <div class="ticket-data">${dataFormatada}</div>
          <div class="ticket-titulo">${t.titulo || t.nome}</div>
        </div>
        <button class="ticket-btn">+</button>
      `;

      card.querySelector(".ticket-btn").addEventListener("click", () => {
        popupTitulo.textContent = t.titulo || t.nome;
        popupTipo.textContent = t.tipo.toUpperCase();
        popupTipo.className = `ticket-tipo ${t.tipo}`;
        popupConteudo.textContent = t.episodio || t.descricao;
        popup.classList.add("show");
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p class='error'>Erro ao carregar tickets.</p>";
  }
}

fecharPopup.onclick = () => popup.classList.remove("show");

popup.onclick = e => {
  if (e.target === popup) popup.classList.remove("show");
};

carregarTickets();
