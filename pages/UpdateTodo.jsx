import {
  useContract,
  useContractWrite,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import styles from "../styles/UpdateList.module.css";
import { PiStampBold } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const UpdateTodo = () => {
  const router = useRouter();
  const query = router.query.index;

  const date = new Date();
  const [taskDescription, setTaskDescription] = useState("");
  const [timeStamp, setTimeStamp] = useState(date.toDateString());
  const [taskcompleted, setTaskcompleted] = useState(false);
  const { contract } = useContract(
    "0xEb3C42eF4251772255c3AFe09Cd80Ff90a7BCe58"
  );
  const { mutateAsync: updateTask, isLoading: UpdatetaskLoading } =
    useContractWrite(contract, "updateTask");

  const { data, isLoading } = useContractRead(contract, "getAllTasks");

  useEffect(() => {
    if (data) {
      if (query == null || query == undefined || query >= data.length) {
        router.push("/");
      } else if (data) {
        for (let i = 0; i < data.length; i++) {
          if (query == i) {
            console.log(data[i]);
            setTaskDescription(data[i].taskDescription);
            setTaskcompleted(data[i].taskCompleted);
          }
        }
      }
    }
  }, [data, query, router]);
  const handleChange = () => {
    setTaskcompleted(!taskcompleted);
  };
  useEffect(() => {
    console.log(taskcompleted);
  }, [taskcompleted]);

  const call = async () => {
    try {
      const data = await updateTask({
        args: [query, taskDescription, timeStamp, taskcompleted],
      });
      console.info("contract call successs", data);
      router.push("/");
    } catch (err) {
      console.error("contract call failure", err);
      alert("Task Update failed!");
    }
  };
  return (
    <div className={styles.updatetodomaindiv}>
      <div className={styles.topcirclediv}>
        <PiStampBold />
      </div>
      <div className={styles.addtodoinputandheading}>
        <h3>Update your task...</h3>
        <div className={styles.inputuperdiv}>
          <textarea
            name="text"
            placeholder="Prepare business plan and implement it...."
            className={styles.descriptioninput}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
          <div>
            <label htmlFor="taskcompleted">Task Completed?</label>
            <input
              type="checkbox"
              name="taskcompleted"
              id="taskcompleted"
              checked={taskcompleted}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.pushbtn}>
        <div>
          <button onClick={call}>SAVE</button>
        </div>
      </div>
      {isLoading && (
        <dialog className={styles.loadingdialog} open>
          Loading...
        </dialog>
      )}
      {UpdatetaskLoading && (
        <dialog className={styles.loadingdialog} open>
          Updating...
        </dialog>
      )}
    </div>
  );
};

export default UpdateTodo;
