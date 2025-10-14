
document.getElementById("form-contato").addEventListener("submit", async function(e) {
  e.preventDefault();

  const alertBox = document.getElementById("alert-msg");
  alertBox.classList.add("d-none");

  const formData = Object.fromEntries(new FormData(this).entries());

  try {
    const res = await fetch("/enviar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const text = await res.text();
    alertBox.textContent = text;
    alertBox.className = "alert alert-success mt-3";
    alertBox.classList.remove("d-none");

    this.reset();
  } catch (err) {
    console.error(err);
    alertBox.textContent = "Ocorreu um erro ao enviar a mensagem.";
    alertBox.className = "alert alert-danger mt-3";
    alertBox.classList.remove("d-none");
  }
});

