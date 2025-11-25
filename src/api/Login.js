import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ColorModeContext } from "../ThemeContext";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Divider,
  CssBaseline,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || "/";

  function handleSubmit(e) {
    e.preventDefault();
    const res = auth.login({ username, password });
    if (!res.ok) {
      setError(res.message);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">Вход в систему</Typography>
            <Button onClick={colorMode.toggleColorMode} variant="outlined">
              Переключить тему
            </Button>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Имя пользователя"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" fullWidth>
              Войти
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Тестовые аккаунты:
          </Typography>
          <Typography variant="body2">admin / adminpass</Typography>
          <Typography variant="body2">user / userpass</Typography>

          <Box sx={{ mt: 2 }}>
            <Button component={Link} to="/" variant="text">
              На главную
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
