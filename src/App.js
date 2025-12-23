import "./App.css";
import ClientAPI from "./api/service";
import Table from "./Table";
import Form from "./Form";
import { useState, useContext, useMemo, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./api/AuthContext";
import Login from "./api/Login";
import { clientReducer } from "./reducers/clientReducer";

import { createTheme, ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ColorModeContext } from "./ThemeContext";
import Header from "./Header";

const initialClients = { clients: ClientAPI.all() };

function HomeInner() {
  const [state, dispatch] = useReducer(clientReducer, initialClients);
  const auth = useContext(AuthContext);

  const delCli = (id) => {
    if (!auth?.isAdmin) return;
    if (ClientAPI.delete(id)) {
      dispatch({ type: "DELETE_CLIENT", payload: id });
    }
  };

  const addClient = (client) => {
    if (!auth?.isAdmin) return null;
    const newClient = ClientAPI.add(client);
    if (newClient) {
      dispatch({ type: "ADD_CLIENT", payload: newClient });
    }
  };

  return (
    <Container sx={{ padding: 2 }}>
      <CssBaseline />
      {/* Убраны локальные кнопки навигации и переключения темы — теперь в Header */}
      {auth?.isAdmin && (
        <Form handleSubmit={addClient} inClient={{ name: "", surname: "", phone: "" }} />
      )}

      <Table clients={state.clients} delClient={delCli} isAdmin={auth?.isAdmin} />
    </Container>
  );
}

export default function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomeInner />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
