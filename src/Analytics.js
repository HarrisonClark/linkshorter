import React from 'react'; 
import NavBar from './NavBar'
import { Box,
        Grid,
        Paper,
        makeStyles } from "@material-ui/core";

import GoToForm from './GoToNewLinkForm'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function Analytics(){
    const classes = useStyles();
    
    return(
        <>
        <NavBar />

        <div className={classes.root}>
            <Grid container spacing={1}>
                
                <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Box display="flex" justifyContent="center">
                        <div>
                            <h1> Go to your new link: </h1>
                            <GoToForm />
                        </div>
                    </Box>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Box display="flex" justifyContent="center">
                        <div>
                            <h1> View Analytics of Your New Link: </h1>
                            
                        </div>
                    </Box>
                </Paper>
                </Grid>
    
            </Grid>
        </div>
        </>
        
    );
}