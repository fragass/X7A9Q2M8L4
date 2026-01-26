document.addEventListener("DOMContentLoaded", () => {

  // SELECT e FORMULÁRIOS
  const tipo = document.getElementById("tipo");
  const formReportar = document.getElementById("form-reportar");
  const formSolicitar = document.getElementById("form-solicitar");
  const formErro = document.getElementById("form-erro"); // NOVO FORM
  const popup = document.getElementById("popup");
  const ok = document.getElementById("ok");

  // INPUTS
  const titulo = document.getElementById("titulo");
  const episodio = document.getElementById("episodio");
  const nome = document.getElementById("nome");
  const descricao = document.getElementById("descricao");
  const erroDescricao = document.getElementById("erroDescricao"); // NOVO INPUT

  // ALTERA FORMULÁRIO EXIBIDO
  tipo.addEventListener("change", () => {
    formReportar.style.display = "none";
    formSolicitar.style.display = "none";
    formErro.style.display = "none";

    if (tipo.value === "reportar") formReportar.style.display = "block";
    if (tipo.value === "solicitar") formSolicitar.style.display = "block";
    if (tipo.value === "erro") formErro.style.display = "block"; // NOVO
  });

  // SUBMIT REPORTAR
  formReportar.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "reportar",
        titulo: titulo.value,
        episodio: episodio.value
      })
    });

    formReportar.reset();
    popup.classList.add("show");
  });

  // SUBMIT SOLICITAR
  formSolicitar.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "solicitar",
        nome: nome.value,
        descricao: descricao.value
      })
    });

    formSolicitar.reset();
    popup.classList.add("show");
  });

  // SUBMIT ERRO (NOVO)
  formErro.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "erro",
        descricao: erroDescricao.value
      })
    });

    formErro.reset();
    popup.classList.add("show");
  });

  // FECHAR POPUP
  ok.onclick = () => popup.classList.remove("show");

});
