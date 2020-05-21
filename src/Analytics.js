import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Link Shorter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Home() {
  let history = useHistory();

  function pushHome() {
    history.push("/");
  }

  return (
    <Button
      style={{ textTransform: "none" }}
      onClick={pushHome}
      size="medium"
      color="primary"
    >
      Home
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function GoTo() {
  const classes = useStyles();
  const [shortURL, setShortURL] = useState("");

  function PageViews(e) {
    console.log(e)
    e.preventDefault();
    fetch("/api/info/" + shortURL)
      
      .then((res) => 
            res.json())
      .then((res) => setShortURL(res.shortURL));
  }
  const onChange = (e) => {
    setShortURL(e.target.value);
  };


  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Analytics
        </Typography>
        <form className={classes.form} onSubmit={PageViews}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="shortURL"
            label="Short URL"
            name="shortURL"
            autoComplete="shortURL"
            onChange={onChange}
            value={shortURL}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Page Views 
          </Button>
          <Grid container>
            <Grid item>
              <Home />
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

