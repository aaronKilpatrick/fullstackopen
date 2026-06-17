const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const dateString = new Date().toString();
  res.send(`
    <html>
      <body>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${dateString}</p>
      </body>
    </html>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.number || !body.name) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (nameExists(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: String(generateId(1000000)),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const note = persons.find((p) => p.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({
      status: 404,
      error: "Not found",
      message: `No entry found with id ${id}`,
    });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

function generateId(max) {
  return Math.floor(Math.random() * max);
}

function nameExists(name) {
  return persons.some(
    (person) => person.name.toLowerCase() === name.toLowerCase(),
  );
}
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
