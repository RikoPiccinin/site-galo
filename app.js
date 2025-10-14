const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const RSSParser = require("rss-parser");
const parser = new RSSParser();

const app = express();


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});


app.post("/enviar-email", (req, res) => {
  const { nome, email, mensagem } = req.body;

  let transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: "riko.piccinin@yahoo.com",
      pass: "Rikinho27",
    },
  });

  const mailOptions = {
    from: email,
    to: "riko.piccinin@yahoo.com",
    subject: `Mensagem do site de ${nome}`,
    text: mensagem,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Erro ao enviar a mensagem.");
    } else {
      console.log("Email enviado: " + info.response);
      res.send("Mensagem enviada com sucesso!");
    }
  });
});












const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



//PARA USAR OS SERVIÇOS DO  YAHOO

/*
const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,          // porta SSL do Yahoo
  secure: true,       // true = usa SSL
  auth: {
    user: "SEU_EMAIL@yahoo.com",
    pass: "SUA_SENHA_DO_APP", // senha do aplicativo
  },
});





const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/enviar", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: "SEU_EMAIL@yahoo.com",
      pass: "SUA_APP_PASSWORD",
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "SEU_EMAIL@yahoo.com", // para onde a mensagem vai
      subject: `Mensagem do site de ${nome}`,
      text: mensagem,
    });
    res.send("Mensagem enviada com sucesso!");
  } catch (err) {
    console.log(err);
    res.send("Erro ao enviar a mensagem.");
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));




*/