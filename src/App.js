import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/700.css";
import { useState } from "react";
import { v4 as uid } from "uuid";
import { TodosContext } from "./contexts/todosContext";
import SnackBar from "./components/SnackBar";
import { toastContext } from "./contexts/toastContext";
import { ShowChart } from "@mui/icons-material";

const initTodos = [
  {
    id: uid(),
    title: "مهمتي الأولى",
    details: "هذه تفاصيل مهمتي الأولى من هنا إلى الآن ",
    isCompleted: false,
  },
  {
    id: uid(),
    title: "مهمتي الثانية",
    details: "هذه تفاصيل مهمتي الثانية من هنا إلى الآن ",
    isCompleted: false,
  },
  {
    id: uid(),
    title: "مهمتي الثالث",
    details: "هذه تفاصيل مهمتي الثالث من هنا إلى الآن ",
    isCompleted: true,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["Cairo", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

function App() {
  const [todos, setTodos] = useState(initTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  function ShowHideSnack(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => setOpen(false), 2000);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <toastContext.Provider value={{ ShowHideSnack }}>
          <SnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#191b1f",
                height: "100vh",
                direction: "rtl",
              }}
            >
              <TodoList />
            </div>
          </TodosContext.Provider>
        </toastContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
