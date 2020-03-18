import { css } from 'lit-element';

export const pkmnHeaderStyles = css`
    .pkmn {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }
    
    .pkmn-header {
        text-align: center;
    }
    
    .pkmn-header__title {
        font-size: 3rem;
    }
    
    .pkmn-header__subtitle {
        font-size: 1rem;
    }
    
    .pkmn-header__number-input {
        width: 70px;
        height: 2em;
        border: 1px solid black;
        text-align: center;
    }
    
    .pkmn-header__search-button {
        padding: 1em 2em 1em 2em;
        margin: 2em;
        background-color: blue;
        color: white;
        font-weight: 700;
    }
`;