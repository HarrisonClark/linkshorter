import React from 'react'; 
import { Box } from "@material-ui/core";
import LinkForm from './LinkForm';
import NavBar from './NavBar'; 

export default function Home(){
    return(
        <>
        <NavBar />

        <Box display="flex" justifyContent="center">
            <LinkForm />
        </Box>
        </>
    ); 
}