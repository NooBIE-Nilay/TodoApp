import { useState } from "react";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { todoParams } from "@nilay-n00bie/common";
import { authState } from "../Store/authState";
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => res.json());

const InitTodos = (props: any) => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/todo/todos",
    fetcher
  );
  if (isLoading || error) return <div>Loading....</div>;
  props.setTodos(data);
  return <></>;
};
const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<todoParams[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authStateValue = useRecoilValue(authState);
  const addTodo = async () => {
    const res = await fetch("http://localhost:3000/todo/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const resData = await res.json();
    if (resData.newTodo) {
      let newTodos = [];
      for (let i = 0; i < todos.length; i++) {
        newTodos.push(todos[i]);
      }
      newTodos.push(resData);
      setTodos(newTodos);
      setTitle("");
      setDescription("");
    }
  };
  // console.log(todos.length);
  const markDone = async (id: string) => {
    const res = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ is_done: true }),
    });
    const updatedTodo = await res.json();
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };
  return (
    <div>
      <InitTodos setTodos={setTodos} />
      <div style={{ display: "flex" }}>
        <h2> Welcome {authStateValue.username}</h2>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div>
        <h2>Todo(s) </h2>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button
              onClick={() => {
                markDone(todo._id || "");
              }}
            >
              {todo.is_done ? "Done" : "Mark as Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Todos;
