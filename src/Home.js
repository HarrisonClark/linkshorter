import React from 'react'; 
import { Box } from "@material-ui/core";
import LinkForm from './LinkForm';

export default function Home(){
    return(
        <>
        <Box display="flex" justifyContent="center">
            <LinkForm />
        </Box>
        </>
    ); 
}