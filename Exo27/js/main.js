const apiURL = "https://pokeapi.co/api/v2/pokemon/";
const searchInput = document.getElementById('search-input');
const pokemonForm = document.getElementById('pokemon-search');
const pokemonDisplay = document.getElementById('pokemon-display');
const pokemonPicture = document.getElementById('pokemon-picture');
const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const previousButton = document.getElementById('pokemon-previous');
const nextButton = document.getElementById('pokemon-next');

let currentPokemonId = null;

async function fetchPokemon(identifiant) {
  try {
    const response = await fetch(`${apiURL}${identifiant}`);
    if (!response.ok) {
      throw new Error("Pokemon non trouvé");
    }
    const pokemonData = await response.json();
    displayPokemon(pokemonData);
  } catch (error) {
    alert(error.message);
  }
}

function displayPokemon(pokemon) {
  currentPokemonId = pokemon.id;
  pokemonPicture.src = pokemon.sprites.front_default;
  pokemonId.textContent = `Id : ${pokemon.id}`;
  pokemonName.textContent = `Nom : ${pokemon.name}`;
  pokemonWeight.textContent = `Poids : ${(pokemon.weight / 10).toFixed(1)} kg`;
  pokemonHeight.textContent = `Taille : ${(pokemon.height * 10).toFixed(1)} cm`;
  
  // Formater et afficher les types
  const types = pokemon.types.map(typeInfo => typeInfo.type.name);
  pokemonTypes.textContent = `Type(s) : ${types.join(", ")}`;

  // Formater et afficher les capacités
  const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name);
  pokemonAbilities.textContent = `Capacités : ${abilities.join(", ")}`;

  // Activer ou désactiver les boutons de navigation
  previousButton.disabled = currentPokemonId === 1;
  nextButton.disabled = currentPokemonId === 1010; 
}

// Gestion du formulaire d'envoi
pokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value.trim().toLowerCase();
  if (searchValue) {
    fetchPokemon(searchValue);
  }
});

// Gestion des boutons suivant/précédent
previousButton.addEventListener("click", () => {
  if (currentPokemonId > 1) {
    fetchPokemon(currentPokemonId - 1);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPokemonId < 1010) { 
    fetchPokemon(currentPokemonId + 1);
  }
});
