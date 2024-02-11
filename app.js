const express = require("express");
const data = require("./data/pokemons.js");

const app = express();
app.use(express.json());

// Initialize variable to give each new Pokemon a unique ID
let nextPokemonId = data.length;

app.get("/", function (req, res) {
  res.send({ message: "Hello! Try /pokemons" });
});

// GET all Pokemons
app.get("/pokemons", function (req, res) {
  // Return all Pokemons
  res.send(data);
});

// GET Pokemon by ID
app.get("/pokemons/:id", function (req, res) {
  // Find Pokemon with requested ID
  const pokemon = data.find((p) => p.id === Number(req.params.id));

  if (pokemon) {
    // Pokemon was found; return it
    res.send(pokemon);
  } else {
    // Pokemon was not found; return 404 error
    res.status(404).send({ error: "Pokemon does not exist" });
  }
});

// Get attacks by Pokemon ID
app.get("/pokemons/:id/attacks", function (req, res) {
  // Find Pokemon with requested ID
  const pokemon = data.find((p) => p.id === Number(req.params.id));

  if (pokemon) {
    let message;
    if (pokemon.attacks) {
      message = `Request for attack details for pokemon with id '${req.params.id}' successful.`;
      res.send({ message, attacks: pokemon.attacks });
    } else {
      message = "This pokemon has no attacks.";
      res.send(message);
    }
  } else {
    // Pokemon was not found; return 404 error
    res.status(404).send({ error: "Pokemon does not exist" });
  }
});

// const newPokemon = {
//   "name": "Frank",
//   "classification": "Water Pokémon",
// }

// POST Pokemon
app.post("/pokemons", function (req, res) {
  // Create new Pokemon obj with req.body
  // Add unique ID to obj, then increment unique ID variable
  // Add new Pokemon obj to data array
  // Return array of all Pokemons
  const newPokemon = req.body;
  data.push({ ...newPokemon, id: ++nextPokemonId });
  const message = `Pokémon was added with id '${nextPokemonId}'.`;
  res.status(201).send({ message, data });
});

// PUT Pokemon by ID
app.put("/pokemons/:id", function (req, res) {
  // Find the index of the Pokemon with the requested ID
  // If the Pokemon was found
  // Replace it with req.body in the array
  // Return updated array
  // Else
  // Return 404 error

  // Find Pokemon with requested ID

  const reqId = Number(req.params.id);
  const pokemon = data.find((p) => p.id === reqId);

  if (pokemon) {
    const index = data.indexOf(pokemon);

    data.splice(index, 1, { ...req.body, id: reqId });

    const message = `Pokémon with id '${reqId}' was updated.`;

    res.send({ message, data });
  } else {
    // Pokemon was not found; return 404 error
    res.status(404).send({ error: "Pokemon does not exist" });
  }
});

// DELETE Pokemon by ID
app.delete("/pokemons/:id", function (req, res) {
  // Find Pokemon with requested ID
  const pokemon = data.find((p) => p.id === Number(req.params.id));

  if (pokemon) {
    const index = data.indexOf(pokemon);

    data.splice(index, 1);

    const message = `Pokémon with id '${req.params.id}' was deleted.`;

    res.send({ message, data });
  } else {
    // Pokemon was not found; return 404 error
    res.status(404).send({ error: "Pokemon does not exist" });
  }
});

app.listen(9000);
console.log("Listening on port 9000...");
