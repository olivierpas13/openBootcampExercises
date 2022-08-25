import styled from 'styled-components';
import  Container  from '@mui/material/Container';

export const BlogContainer = styled(Container)`

    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    h1{
        margin-top: 7%;
        font-size: 300%;
        font-weight: 600;
        color: #1C3879;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 300ms;

        &:hover{
            transform: scale(1.1, 1.1);
            color: black;
        }
        }
    h3{
        color: #607EAA;
        font-size: 200%;
    }
    p{
        color: #607EAA;
        font-size: 150%;
    }
    /* font-size: 150%; */

`;
