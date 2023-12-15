const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)"
  );
  db.run(
    "CREATE TABLE dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)"
  );
});

app.post("/cats", (req, res) => {
  const { name } = req.body;

  const sql = `INSERT INTO cats (name, votes) VALUES (?, 0)`;

  db.run(sql, name, function (err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post("/dogs", (req, res) => {
  const { name } = req.body;

  const sql = `INSERT INTO dogs (name, votes) VALUES (?, 0)`;
  db.run(sql, name, function (err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post("/vote/:animalType/:id", (req, res) => {
  const { animalType, id } = req.params;

  //se há consistencia = error
  // Validando id
  if (isNaN(id) || id < 0) {
    return res.status(400).send("Invalid ID");
  }

  // Validando animal
  if (!["cats", "dogs"].includes(animalType)) {
    return res.status(400).send("Invalid animal type");
  }

  const fetchQuery = `SELECT * FROM ${animalType} WHERE id = ?`;
  db.get(fetchQuery, id, (err, row) => {
    if (err) {
      return res.status(500).send("Erro ao enviar a database");
    }
    if (!row) {
      return res.status(404).send(`No ${animalType} found with ID ${id}`);
    }

    const updateSql = `UPDATE ${animalType} SET votes = votes + 1 WHERE id = ?`;
    db.run(updateSql, id, function (updateErr) {
      if (updateErr) {
        return res.status(500).send("Error updating the database");
      }
      res.status(200).send("Vote successfully recorded");
    });
  });
});

app.get("/cats", (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.get("/dogs", (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro!");
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});
