import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Todo from "./Todo";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uid } from "uuid";
import { toastContext } from "../contexts/toastContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [newInput, setnewInput] = useState("");
  const [todosType, settodosType] = useState("all");
  const [dialogId, setdialogId] = useState(null);

  //using the toast snack context
  const { ShowHideSnack } = useContext(toastContext);

  // Dialog configurations
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({ title: "", details: "" });

  function openDialog(todo) {
    setdialogId(todo);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  function openEditDialog(todo) {
    setdialogId(todo);
    setEditTodo({ title: todo.title, details: todo.details });
    setOpenEdit(true);
  }

  const handleCloseEdit = () => setOpenEdit(false);

  function handleDeleteConfirm() {
    const updateTodo = todos.filter((t) => t.id !== dialogId.id);
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    handleClose();
    ShowHideSnack("تمت حذف المهمة بنجاح!");
  }

  function handleCheckClick(todo) {
    const updateTodo = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    ShowHideSnack("تمت انجاز المهمة بنجاح!");
  }

  function handleEditClick(event) {
    event.preventDefault();
    const updateTodo = todos.map((t) =>
      t.id === dialogId.id
        ? { ...t, title: editTodo.title, details: editTodo.details }
        : t
    );
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    handleCloseEdit();
    ShowHideSnack("تمت تعديل المهمة بنجاح!");
  }

  const todosJSX = useMemo(() => {
    return todos.map((t) => {
      if (todosType === "completed" && t.isCompleted) {
        return (
          <Todo
            key={t.id}
            todo={t}
            showDelete={openDialog}
            openEdit={openEditDialog}
            handleCheck={handleCheckClick}
          />
        );
      } else if (todosType === "non-completed" && !t.isCompleted) {
        return (
          <Todo
            key={t.id}
            todo={t}
            showDelete={openDialog}
            openEdit={openEditDialog}
            handleCheck={handleCheckClick}
          />
        );
      } else if (todosType === "all") {
        return (
          <Todo
            key={t.id}
            todo={t}
            showDelete={openDialog}
            openEdit={openEditDialog}
            handleCheck={handleCheckClick}
          />
        );
      }
      return null;
    });
  }, [todos, todosType]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, [setTodos]);

  function handleAddClick() {
    const createTodo = {
      id: uid(),
      title: newInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, createTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setnewInput("");
    ShowHideSnack("تمت اضافة مهمة جديدة بنجاح!");
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
          {"هل انت متأكد حقاً من أمر الحذف؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            سيتم الحذف بشكل دائم دون أي تراجع
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>لا</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم, أحذف
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          align="center"
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h2" fontWeight={900}>
              مهامي
            </Typography>
            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", margin: "30px 0px" }}
              color="primary"
              value={todosType}
              exclusive
              onChange={(e) => settodosType(e.target.value)}
              aria-label="Platform"
              centered
            >
              <ToggleButton value="non-completed">غير منجر</ToggleButton>
              <ToggleButton value="completed">منجر</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            <Grid container marginTop={2}>
              <Grid
                xs={8}
                display="flex"
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <TextField
                  value={newInput}
                  onChange={(e) => setnewInput(e.target.value)}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  required
                  style={{ width: "100%", height: "100%", marginLeft: "10px" }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  disabled={newInput.length < 5}
                  variant="contained"
                  onClick={handleAddClick}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>

            {/* Render the Todos List */}
            {todosJSX}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
