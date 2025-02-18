const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonDetails = document.querySelector('.pokemon__details');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const pokemonType = document.createElement('span');
const pokemonAbility = document.createElement('span');


let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
      }
}

const audioButton = document.createElement('button');
audioButton.classList.add('pokemon__audio');
audioButton.innerHTML = '🔊'; // Ícone de som
audioButton.style.display = 'none'; // Esconde até ter um som válido

const audioElement = document.createElement('audio');
audioButton.addEventListener('click', () => {
    audioElement.play();
});

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonDetails.innerHTML = '';
    const data = await fetchPokemon(pokemon);
  
    if (data) {
      pokemonImage.style.display = 'block';
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      input.value = '';
      searchPokemon = data.id;
      
      const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`;
      audioElement.src = audioUrl;
      audioButton.style.display = 'inline-block'; // Mostra o botão de áudio

      const type = data.types.length > 0 ? data.types[0].type.name : "Desconhecido";
      const typeElement = document.createElement('span');
      typeElement.classList.add('pokemon__type');
      typeElement.innerHTML = `<strong>Tipo:</strong> ${type}`;

      
      const ability = data.abilities.length > 0 ? data.abilities[0].ability.name : "Nenhuma";
      const abilityElement = document.createElement('span');
      abilityElement.classList.add('pokemon__ability');
      abilityElement.innerHTML = `<strong>Habilidade:</strong> ${ability}`;

      pokemonDetails.appendChild(typeElement);
      pokemonDetails.appendChild(abilityElement);
      pokemonDetails.appendChild(audioButton); // Adiciona o botão de áudio
       input.value = '';
       searchPokemon = data.id;

       const types = data.types.map(t => t.type.name).join(', ');
       document.querySelector('.pokemon__type-sidebar').style.width = `${data.types.length * 50}%`; // Ajusta a largura
       document.querySelector('.pokemon__type-sidebar').innerHTML = types;
       document.querySelector('.pokemon__image-sidebar').src = data.sprites.front_default;
       // Pegar habilidades e definir largura da barra
       const abilities = data.abilities.map(a => a.ability.name).join(', ');
       document.querySelector('.pokemon__ability-sidebar').style.width = `${data.abilities.length * 50}%`;
       document.querySelector('.pokemon__ability-sidebar').innerHTML = abilities;

       // Ajustar altura e peso (convertendo valores)
       document.querySelector('.pokemon__height').style.width = `${data.height * 10}%`;
       document.querySelector('.pokemon__height').innerHTML = `${(data.height / 10).toFixed(1)}m`;

       document.querySelector('.pokemon__weight').style.width = `${data.weight * 10}%`;
       document.querySelector('.pokemon__weight').innerHTML = `${(data.weight / 10).toFixed(1)}kg`;
       document.querySelector('.pokemon__number-sidebar').innerHTML = data.id;
       document.querySelector('.pokemon__name-sidebar').innerHTML = data.name;
       document.querySelector('.pokemon__type-sidebar').innerHTML = data.types.map(t => t.type.name).join(', ');
       document.querySelector('.pokemon__ability-sidebar').innerHTML = data.abilities.map(a => a.ability.name).join(', ');
       document.querySelector('.pokemon__height').innerHTML = (data.height / 10).toFixed(1); // Convertendo para metros
       document.querySelector('.pokemon__weight').innerHTML = (data.weight / 10).toFixed(1); // Convertendo para kg



    } else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Not found :c';
      pokemonNumber.innerHTML = '';
      pokemonImage.style.display = 'none';
      pokemonDetails.innerHTML = `
      <span class="pokemon__type"><strong>Tipo:</strong> --</span>
      <span class="pokemon__ability"><strong>Habilidade:</strong> --</span>
  `;
    }
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });
  
  buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });
  
  renderPokemon(searchPokemon);

  
