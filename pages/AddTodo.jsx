import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { PiStampBold } from "react-icons/pi";
import styles from "../styles/AddList.module.css";
import { useRouter } from "next/router";

const AddTodo = () => {
  const address = useAddress();
  const router = useRouter();

  const date = new Date();
  const [taskDescription, setTaskDescription] = useState("");
  const [timeStamp, setTimeStamp] = useState(date.toDateString());
  //const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContract(
    "0xEb3C42eF4251772255c3AFe09Cd80Ff90a7BCe58"
  );
  const { mutateAsync: addTasks, isLoading } = useContractWrite(
    contract,
    "addTasks"
  );
  const call = async () => {
    if (typeof taskDescription === "string" && taskDescription.trim() == "") {
      alert("Please Write Something!");
    } else if (
      typeof taskDescription === "string" &&
      !taskDescription.trim() == ""
    ) {
      try {
        const data = await addTasks({ args: [taskDescription, timeStamp] });
        router.push("/");
      } catch (err) {
        alert("Task addition Rejected or Failed");
      }
    }
  };

  useEffect(() => {
    if (address == null || address == undefined) {
      router.push("/");
      alert("You are suppose to login using wallet!");
    }
  }, [address]);

  return (
    <div className={styles.addtodomain}>
      <div className={styles.topcirclediv}>
        <PiStampBold />
      </div>
      <div className={styles.addtodoinputandheading}>
        <h3>What is in your mind?</h3>
        <div className={styles.inputuperdiv}>
          <textarea
            name="text"
            placeholder="Prepare business plan and implement it...."
            className={styles.descriptioninput}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className={styles.pushbtn}>
        <div>
          <button onClick={call}>PUSH</button>
        </div>
      </div>
      {isLoading && (
        <dialog className={styles.addtodoloading} open>
          Loading...
        </dialog>
      )}
    </div>
  );
};

export default AddTodo;
