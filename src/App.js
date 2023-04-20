import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";

import { CssBaseline } from "@material-ui/core";
import TodoList from "./components/TodoList";


// This uses Material UI's makeStyles hook to create a style object
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


// This for the light and dark theme
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
  // This state is for the toggle dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This function is for the toggle dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // This is for the Material UI's makeStyles hook
  const classes = useStyles();

  return (
    
    <Provider store={store}> {/* This is for the redux store */}
      {/* This is for the toggle dark mode */}
      <ThemeProvider
        theme={isDarkMode ? darkTheme : lightTheme}
        className={classes.root}
      >
        <Tooltip title="Toggle Dark/Light Theme">
          <IconButton onClick={() => handleToggleDarkMode()}>
            {isDarkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
      {/* This is for the Material UI's CssBaseline hook */}
        <CssBaseline />

        {/* This is for the routes */}
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
