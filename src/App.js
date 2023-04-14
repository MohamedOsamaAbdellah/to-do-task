import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";

import { CssBaseline } from "@material-ui/core";
import TodoList from "./components/TodoList";
import SingleTodo from "./components/SingleTodo";
import Weather from "./components/Weather";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#007bff",
    },
    background: {
      default: "#fff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#64b5f6",
    },
    background: {
      default: "#282c34",
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const classes = useStyles();
  console.log("App.js isDarkMode: ", isDarkMode);
  return (
    <Provider store={store}>
      <ThemeProvider
        theme={isDarkMode ? darkTheme : lightTheme}
        className={classes.root}
      >
        <Tooltip title="Toggle Dark/Light Theme">
          <IconButton onClick={() => handleToggleDarkMode()}>
            {isDarkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        <Weather />

        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoList />} />
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
