import './App.css';
import ClientAPI from "./api/service";
import Table from "./Table";
import Form from "./Form";
import { useState, useContext, useMemo, useReducer } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./api/AuthContext";
import Login from "./api/Login";
import { clientReducer } from './reducers/clientReducer';

import { createTheme, ThemeProvider, CssBaseline, Button, Container } from '@mui/material';
import { ColorModeContext } from './ThemeContext';

const initialClients = {clients:ClientAPI.all()};
function HomeInner() {
  const [state, dispatch] = useReducer(clientReducer, initialClients);
  const auth = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);

  const delCli = (id) => {
    if (!auth.isAdmin) return;
    if (ClientAPI.delete(id)) {
      dispatch({ type: 'DELETE_CLIENT', payload: id });
    }
  };

  const addClient = (client) => {
    if (!auth.isAdmin) return null;
    const newClient = ClientAPI.add(client);
    if (newClient) {
      dispatch({ type: 'ADD_CLIENT', payload: newClient });
    }
  };

  return (
    <Container sx={{ padding: 2 }}>
      <CssBaseline />
      <header style={{ marginBottom: 12 }}>
        {auth.isAuthenticated ? (
          <div>
            Вошёл как <strong>{auth.user.username}</strong> роль <strong>{auth.user.role}</strong>
            <Button variant="outlined" onClick={auth.logout} sx={{ ml: 2 }}>Выйти</Button>
          </div>
        ) : (
          <Link to="/login">Войти</Link>
        )}
        <Button variant="outlined" onClick={colorMode.toggleColorMode} sx={{ ml: 2 }}>
          Переключить тему
        </Button>
      </header>

      {auth.isAdmin && (
        <Form handleSubmit={addClient} inClient={{ name: "", surname: "", phone: "" }} />
      )}

      <Table clients={state.clients} delClient={delCli} isAdmin={auth.isAdmin} />
    </Container>
  );
}


export default function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
    }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomeInner />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}