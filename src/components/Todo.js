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

export default function Todo({ todo, showDelete, openEdit, handleCheck }) {
  const { todos, setTodos } = useContext(TodosContext);

  return (
    <>
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
                onClick={() => handleCheck(todo)}
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
                onClick={() => openEdit(todo)}
              >
                <EditIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton
                className="IconButton"
                aria-label="Delete"
                onClick={() => showDelete(todo)}
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
