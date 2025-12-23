import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ColorModeContext } from "./ThemeContext";
import { AuthContext } from "./api/AuthContext";

/**
 * Header — глобальный заголовок приложения.
 * Содержит:
 * - кнопки навигации: Главная, Вход
 * - кнопку переключения темы
 * - при авторизации показывает имя пользователя и роль
 */

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const colorMode = useContext(ColorModeContext);
  const auth = useContext(AuthContext);

  const go = (path) => {
    if (location.pathname !== path) navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => go("/")}
        >
          Клиенты App
        </Typography>

        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Button color="inherit" onClick={() => go("/")}>
            Главная
          </Button>
          <Button color="inherit" onClick={() => go("/login")}>
            Вход
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button color="inherit" variant="outlined" onClick={colorMode.toggleColorMode}>
            Переключить тему
          </Button>

          {auth && auth.isAuthenticated ? (
            <Typography variant="body2" sx={{ ml: 2 }}>
              {auth.user?.username} ({auth.user?.role})
            </Typography>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
