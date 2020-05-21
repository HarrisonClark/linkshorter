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
import { CopyToClipboard } from "react-copy-to-clipboard";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Link Shortner
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Analytics() {
  let history = useHistory();

  function pushAnalytics() {
    history.push("/analytics");
  }

  return (
    <Button
      style={{ textTransform: "none" }}
      onClick={pushAnalytics}
      size="medium"
      color="primary"
    >
      Analytics
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

export default function Shorten() {
  const classes = useStyles();
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [desiredURL, setDesiredURL] = useState("");
  const [error, setError] = useState(false);

  function ShortenURL(e) {
    e.preventDefault();

    if (advanced) {
      console.log("ADVANCED");
      const run = async () => {
        let res = await fetch(
          "/api/create/" + longURL + "?desiredURL=" + desiredURL
        );
        console.log(res);
        res = await res.json();
        console.log(res);
        if (res.status === "TAKEN") {
          console.log("TAKEN");
          setError(true);
        } else {
          setError(false);
        }
        setShortURL(res.shortURL);
      };
      run();
    } else {
      const run = async () => {
        let res = await fetch("/api/create/" + longURL);
        console.log(res);
        res = await res.json();
        console.log(res);

        setShortURL(res.shortURL);
      };
      run();
    }
  }

  const onShortChange = (e) => {
    setLongURL(e.target.value);
  };

  const onDesiredChange = (e) => {
    setDesiredURL(e.target.value);
  };

  function ShortURL() {
    if (shortURL) {
      return (
        <Box mt={8} display="flex">
          <Typography>
            <Link href={shortURL} target="_blank">
              {shortURL}
            </Link>
          </Typography>
          <CopyToClipboard text={shortURL}>
            <Button>Copy</Button>
          </CopyToClipboard>{" "}
        </Box>
      );
    } else {
      return <div></div>;
    }
  }

  function AdvancedOptions() {
    return (
      <Button
        style={{ textTransform: "none" }}
        onClick={() => setAdvanced((a) => !a)}
        size="medium"
        color="primary"
      >
        {advanced ? "Random Link" : "Advanced Options"}
      </Button>
    );
  }

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Link Shortner
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
            onChange={onShortChange}
            value={longURL}
            autoFocus
          />
          {advanced ? (
            error ? (
              <TextField
                variant="outlined"
                margin="normal"
                error={true}
                helperText="URL Taken"
                required
                fullWidth
                id="desiredURL"
                label="Desired URL"
                name="desiredURL"
                autoComplete="desiredURL"
                onChange={onDesiredChange}
                value={desiredURL}
                autoFocus
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="desiredURL"
                label="Desired URL"
                name="desiredURL"
                autoComplete="desiredURL"
                onChange={onDesiredChange}
                value={desiredURL}
                autoFocus
              />
            )
          ) : (
            ""
          )}
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
              <AdvancedOptions />
            </Grid>
            <Grid item>
              <Analytics />
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
