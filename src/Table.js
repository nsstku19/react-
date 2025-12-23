import React, { useState } from "react";
import {
  Table as MuiTable,
  TableContainer,
  Button,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

/**
 * ClientTable
 * props:
 * - clients: массив клиентов
 * - delClient: функция удаления (id) => void
 * - isAdmin: булево, если false — кнопка удаления скрыта/неактивна
 *
 * При нажатии Delete открывается диалог подтверждения.
 */

const ClientTable = ({ clients = [], delClient, isAdmin = false }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId != null) {
      delClient(selectedId);
    }
    handleClose();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.surname}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenConfirm(client.id)}
                    disabled={!isAdmin}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Нет клиентов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этого клиента? Это действие нельзя
            будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Отмена
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientTable;
