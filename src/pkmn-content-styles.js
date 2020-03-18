import { css } from 'lit-element';

export const pkmnContentStyles = css`
    .pkmn-content {
        text-align: center;
    }
    
    .pkmn__name {
        font-size: 2.5rem;
    }
    
    .pkmn__sprites {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 50%;
        max-width: 400px;
    }
    
    .pkmn__sprite {
        width: 40%;
    }
    
    .pkmn__sprite img {
        width: 100%;
    }
`