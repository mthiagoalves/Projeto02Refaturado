const express = require ("express");
const { send } = require("express/lib/response");
const app = express ();
app.set("view engine", "ejs");
const path = require ("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const port = 8081;

const pokedex = [
    {   
        id: 001,
        nome: "Bulbasaur",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
        tipo: "Grass"
    },
    {   
        id: 002,
        nome: "Charmander",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        descricao: "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
        tipo: "Fire"
    },
    {   
        id: 003,
        nome: "Squirtle",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        tipo: "Water"
    },
    {   
        id: 004,
        nome: "Caterpie",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png",
        descricao: "For protection, it releases a horrible stench from the antenna on its head to drive away enemies.",
        tipo: "Bug"
    }
];

let pokemon = undefined;

app.get("/", (req, res) => {
   
    res.render("index", {pokedex, pokemon});
});

app.post("/add", (req, res) => {
    const pokemon = req.body;
    pokemon.id = pokedex.length +1;
    pokedex.push(pokemon);
    res.redirect("/");
});


app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find(item => item.id === id);

    res.redirect("/");
})

app.post("/update/:id", (req,res) => {
    const id = +req.params.id - 1;

    const newPokemon = req.body;
    newPokemon.id = id + 1
    console.log(newPokemon)
    pokedex[id] = newPokemon;
    
    pokemon = undefined;

    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`Servidor rodando na URL http://localhost:${port}`)
})