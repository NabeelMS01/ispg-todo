
import React, { useEffect, useState } from "react";
import { http } from "../api/http";
import { checkTask, deleteTask } from "../services/services";

import styles from '../pages/todo/home.module.css'
type dataprops = {
  data: any,
  setState: any

}


function Task(props: dataprops) {
  const { data, setState } = props
  const [task, setTask] = useState({});

  const { text, _id, id, status } = data;




  const handleDelete = async() => {
   await deleteTask(_id).then((response)=>{
    console.log(response);
    setState(response)
    
   })
  }
  return (
    <div className={styles.task}>
      {
        <input
          defaultChecked={status}
          onChange={async (e) => {
            console.log(e.target.checked);

            await checkTask(data).then((response) => {
              setState(e.target.checked);
            })
          
          }}
          type="checkbox"
        />
      }
  
      <h3 style={status==true ? { textDecoration: "line-through" } : {}}  >{text}</h3>

      <div className={styles.delete}>
        {status ? (
          <button onClick={handleDelete} className={styles.btn}>
            delete
          </button>
        ) : (
          <button
            style={{ backgroundColor: "rgb(253, 80, 80)" }}
            className= {styles.btn}
            disabled
          >
            delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Task