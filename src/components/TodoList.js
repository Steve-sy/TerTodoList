import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { NetworkCell } from "@mui/icons-material";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uid } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [newInput, setnewInput] = useState("");
  const [todosType, settodosType] = useState("all");

  const todosJSX = todos.map((t) => {
    if (todosType === "completed" && t.isCompleted) {
      // Return the completed todos
      return <Todo key={t.id} todo={t} />;
    } else if (todosType === "non-completed" && !t.isCompleted) {
      // Return the non-completed todos
      return <Todo key={t.id} todo={t} />;
    } else if (todosType === "all") {
      // Return all todos
      return <Todo key={t.id} todo={t} />;
    }
    // If none of the conditions match, return null to skip rendering
    return null;
  });

  function changeType(e) {
    settodosType(e.target.value);
  }
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);

  function handelAddClick() {
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
  }
  return (
    <>
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

            {/* filter buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", margin: "30px 0px" }}
              color="primary"
              value={todosType}
              exclusive
              onChange={changeType}
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
                  onChange={(e) => {
                    setnewInput(e.target.value);
                  }}
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
                  onClick={() => {
                    handelAddClick();
                  }}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>

            {/* <Todo /> */}
            {todosJSX}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
