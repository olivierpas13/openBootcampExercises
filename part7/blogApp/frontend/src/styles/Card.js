import styled from 'styled-components';

export const CardGroup = styled.div`

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center

`;

export const Card = styled.div`

    border: 1px solid black;
    margin: 5%;
    background-color: #eee;
    font-size: 150%;
    transition: all 300ms;
    box-shadow: 1px 1px 3px black;

    & a{
        color: #111;
        text-decoration: none;
    }

    &:hover{
        background-color: black;
        a{
            color: whitesmoke
        }
    }

`;


