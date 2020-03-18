import {LitElement, html, css} from 'lit-element';
import {pkmnHeaderStyles} from './pkmn-header-styles';
import {pkmnContentStyles} from './pkmn-content-styles';
import {getPokemonData, saveInIndexedDB} from "./pokemonRepository";

const POKEMON_API_URI = 'https://pokeapi.co/api/v2/pokemon-form/';

class PokeDiv extends LitElement {
    constructor() {
        super();
        this.title = 'Pokédex';
        this.subtitle = "Tippe die Nummer von einem Viech ein und gucks dir an!";
        this.pokemonName = "Bulbasaur";
        this.pokemonFront = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
        this.pokemonBack = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png";
    }

    static get properties() {
        return {
            pokemonName: {type: String},
            pokemonFront: {type: String},
            pokemonBack: {type: String}
        }
    }

    static get styles() {
        return [pkmnHeaderStyles, pkmnContentStyles];
    }

    connectedCallback() {
        super.connectedCallback();
        this.updatePokemonInfo = this.updatePokemonInfo.bind(this);
        this.triggerUpdate = this.triggerUpdate.bind(this);
    }

    render() {
        return html`
            <div class="pkmn">
                <div class="pkmn-header">
                    <h3 class="pkmn-header__title">${this.title}</h3>
                    <p class="pkmn-header__subtitle">${this.subtitle}</p>
                    <div>
                        <input @keyup="${(event) => this.triggerUpdate(event)}" id="number-input" class="pkmn-header__number-input"type="number" />
                    </div>
                    <button @click="${() => this.updatePokemonInfo()}" class="pkmn-header__search-button">Suchen</button>
                </div>
                <div class="pkmn-content">
                    <h3 class="pkmn__name">${this.pokemonName}</h3>
                    <div class="pkmn__sprites">
                        <div class="pkmn__sprite">
                            <img class="pkmn__image" src="${this.pokemonFront}" />
                        </div>
                        <div class="pkmn__sprite">
                            <img class="pkmn__image" src="${this.pokemonBack}" />
                        </div>
                    </div>
                </div>
            </div>
                
        `
    }

    async triggerUpdate(event) {
        if (event.code === 'NumpadEnter' || event.code === 'Enter') {
            this.updatePokemonInfo();
        }
    }

    async updatePokemonInfo() {
        const inputNumber = this.shadowRoot.getElementById('number-input').value;

        if (inputNumber) {
            const pkmn = await getPokemonData(inputNumber);
            if (pkmn) {
                this.pokemonName = pkmn.data.name;
                this.pokemonFront = pkmn.data.imageFront;
                this.pokemonBack = pkmn.data.imageBack;
            } else {
                const url = POKEMON_API_URI + inputNumber;
                console.log("calling url: " + url);
                fetch(url, {
                    headers: {
                        "Accept": "application/json"
                    }
                })
                .then(response => response.json())
                .then(responseJson => {
                    return {
                        name: responseJson.pokemon.name.charAt(0).toUpperCase() + responseJson.pokemon.name.slice(1),
                        imageFront: responseJson.sprites.front_default,
                        imageBack: responseJson.sprites.back_default
                    }
                })
                .then(pkmnData => saveInIndexedDB(inputNumber, pkmnData))
                .then(pkmn => {
                    console.log(pkmn);
                    this.pokemonName = pkmn.data.name;
                    this.pokemonFront = pkmn.data.imageFront;
                    this.pokemonBack = pkmn.data.imageBack;
                });
            }
        }
    }


}

customElements.define('poke-div', PokeDiv);