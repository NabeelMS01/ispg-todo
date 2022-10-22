import type { NextPage } from "next";

import { useEffect, useState } from "react";
import { createTask, fetchTasks, fetchUser } from "../../services/services";
import Task from "../../component/Task";
import styles from "../todo/home.module.css";
import { useRouter } from "next/router";

interface DataTask {
  _id?: string;
  id: string;
  text: string;
  status: boolean;
}
const Home: NextPage = () => {
  const [task, setTask] = useState<string>("");
  const [state, setState] = useState(" ");
  const [tasks, setTasks] = useState<DataTask[]>([]);

  const router = useRouter();

  const addData = async () => {
    const dataTask: DataTask = {
      id: Date.now().toString(),
      text: task,
      status: false,
    };
    const token: any = JSON.parse(localStorage?.getItem("userInfo")!);
    const data: any = await createTask(dataTask, token?.access_token);

    if (data?.data?.text) {
      setTasks([...tasks, data.data]);
    }
    setTask("");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task != "") {
      addData();
    }
  };

  const addTask = (e: any) => {

    setTask(e.target.value);
  };

  useEffect(() => {
    getuser();
  }, []);

  useEffect(() => {
    fetchData();
  }, [state, task]);

  const fetchData = async () => {
    const token: any = JSON.parse(localStorage?.getItem("userInfo")!);
    const tasks: any = await fetchTasks(token.access_token);


    setTasks(tasks.data);
  };

  const getuser = async () => {
    try {
      const token: any = JSON.parse(localStorage?.getItem("userInfo")!);

      const user: any = await fetchUser(token && token).catch((err) => {

        if (err.data.message == "Unauthorized") {
          router.push("login");
        }
      });
    } catch (error: any) {

      if (error?.data?.message == "Unauthorized") {
        router.push("/login");
      }
    }
  };

  return (
    <div className="App">
      <div className={styles.title}>
        <h1>Todo App</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.input}>
          <form onSubmit={handleSubmit}>
            <input
              value={task}
              onChange={addTask}
              className={styles.inputBox}
              type="text"
            />
            <button type="submit">Add todo</button>
          </form>
        </div>
      </div>

      <div className={styles.tasks}>
        <h2 className={styles.h2}>Tasks</h2>
        {tasks.map((data: DataTask, index: number) => {

          return <Task key={data._id} data={data} setState={setState} />;
        })}
      </div>
    </div>
  );
};

export default Home;
