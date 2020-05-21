import React, { useEffect, useState } from "react"; 
import TextField from '@material-ui/core/TextField';
import { makeStyles,
        Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        marginTop: "30px",
      },
    },
  }));

export default function GotToForm() {
    const classes = useStyles();
    return(
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField id="outlined-basic" label="Go to Your New Link" placeholder= "Enter Your Link" variant="outlined" />
          </div>
          <div>
            <Button variant="contained" color="primary"> Submit </Button>
          </div>
        </form>

    ); 

}