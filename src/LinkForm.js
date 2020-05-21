import React, { useEffect, useState } from "react"; 
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        marginTop: "300px",
      },
    },
  }));

export default function LinkForm() {
    const classes = useStyles();
    return(
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Link Shortner" placeholder= "Enter Your Link" variant="outlined" />
        </form>
    ); 

}