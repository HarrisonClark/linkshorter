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

export default function Shorten() {
  const classes = useStyles();
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");

  function ShortenURL(e) {
    e.preventDefault();
    fetch("/api/create/" + longURL)
      .then((res) => res.json())
      .then((res) => setShortURL(res.shortURL));
  }

  const onChange = (e) => {
    setLongURL(e.target.value);
  };

  function ShortURL() {
    if (shortURL) {
      return <Box mt={8}>{shortURL}</Box>;
    } else {
      return <div></div>;
    }
  }

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Link Shorter
        </Typography>
        <form className={classes.form} onSubmit={ShortenURL}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="longURL"
            label="URL To Shorten"
            name="longURL"
            autoComplete="longURL"
            onChange={onChange}
            value={longURL}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Shorten
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Advanced Options
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"View Analytics"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ShortURL />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
