import React, { useContext, useState } from "react";
import Grid from "@mui/joy/Grid";
import { IconButton, Card, CardContent, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { TodosContext } from "../contexts/todosContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function Todo({ todo }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  const openDialog = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openEditDialog = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  function handleDeleteConfirm() {
    const updateTodo = todos.filter((t) => t.id !== todo.id);
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    handleClose();
  }

  function handleCheckClick(id) {
    const updateTodo = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }

  function handleEditClick(event) {
    event.preventDefault();
    const updateTodo = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: editTodo.title, details: editTodo.details }
        : t
    );
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));

    handleCloseEdit();
  }

  return (
    <>
      {/* Edit Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openEdit}
        onClose={handleCloseEdit}
        PaperProps={{
          component: "form",
          onSubmit: handleEditClick,
        }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>إلى ماذا تريد تعديل المهمة؟</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            value={editTodo.title}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            value={editTodo.details}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEditTodo({ ...editTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>تراجع</Button>
          <Button type="submit">تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد حقاً من امر الحذف؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            سيتم الحذف بشكل دائم دون اي تراجع
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم, أحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Todo Card */}
      <Card
        className="CardTodo"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          margin: "10px 0",
        }}
        align="center"
        color="success"
      >
        <CardContent>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                align="right"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" align="right">
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display={"flex"}
              justifyContent={"space-around"}
              alignContent={"center"}
            >
              <IconButton
                className="IconButton"
                aria-label="Check"
                onClick={() => handleCheckClick(todo.id)}
              >
                {todo.isCompleted ? (
                  <CheckIcon sx={{ color: "white" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon sx={{ color: "white" }} />
                )}
              </IconButton>

              <IconButton
                className="IconButton"
                aria-label="Edit"
                onClick={openEditDialog}
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton
                className="IconButton"
                aria-label="Delete"
                onClick={openDialog}
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
