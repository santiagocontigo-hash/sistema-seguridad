const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let reportes = [];

// FORMULARIO
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "formulario.html"));
});

// GUARDAR
app.post("/guardar", (req, res) => {

    const nuevoReporte = {
        fecha: new Date().toLocaleString(),
        unidad: req.body.unidad,
        turno: req.body.turno,
        funcionario: req.body.funcionario,
        categoria: req.body.categoria,
        cantidad: req.body.cantidad,
        observacion: req.body.observacion
    };

    reportes.push(nuevoReporte);

    res.redirect("/panel");
});

// PANEL
app.get("/panel", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "panel.html"));
});

// API
app.get("/api/reportes", (req, res) => {
    res.json(reportes);
});

app.listen(3000, () => {
    console.log("🚀 Sistema Operativo funcionando en http://localhost:3000");
});