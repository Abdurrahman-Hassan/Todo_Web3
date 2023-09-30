import React, { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

//import { useRouter } from "next/router";

const TodoLists = () => {
  //const router = useRouter();
  const address = useAddress();

  const { contract } = useContract(
    "0xEb3C42eF4251772255c3AFe09Cd80Ff90a7BCe58"
  );
  const { data, isLoading } = useContractRead(contract, "getAllTasks");

  let { mutateAsync: removeTasks, isLoading: isLoadingDelete } =
    useContractWrite(contract, "removeTasks");

  const callRemove = async (originalIndex) => {
    try {
      const result = await removeTasks({ args: [originalIndex] });
      //router.reload();
    } catch (err) {
      isLoadingDelete = false;
    }
  };

  const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isLoading) {
    return (
      <div>
        <h3>Loading....</h3>
      </div>
    );
  }
  let foundMatchingTasks = false;

  if (data.length >= 1) {
    const handleNextClick = () => {
      if (startIndex + itemsPerPage < data.length) {
        setStartIndex(startIndex + itemsPerPage);
      }
    };

    const handlePrevClick = () => {
      if (startIndex - itemsPerPage >= 0) {
        setStartIndex(startIndex - itemsPerPage);
      }
    };
    return (
      <div className={styles.alllistdiv}>
        {data
          .slice(startIndex, startIndex + itemsPerPage)
          .map((task, index) => {
            if (task.taskOwner === address) {
              foundMatchingTasks = true; // Set the flag to true if a matching task is found

              return (
                <div key={index} className={styles.onetodo}>
                  {task.taskCompleted ? (
                    <strike>
                      <Link href={`/UpdateTodo?index=${startIndex + index}`}>
                        <h3>{`${task.taskDescription.slice(0, 22)}...`}</h3>
                      </Link>
                    </strike>
                  ) : (
                    <Link href={`/UpdateTodo?index=${startIndex + index}`}>
                      <h3>{`${task.taskDescription.slice(0, 22)}...`}</h3>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      const originalIndex = startIndex + index;
                      callRemove(originalIndex);
                    }}
                    className={styles.onetodobutton}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              );
            }
            return null;
          })}
        <div className={styles.pagination}>
          <div>
            <button onClick={handlePrevClick} disabled={startIndex === 0}>
              &lt;
            </button>
          </div>
          <div>
            <button
              onClick={handleNextClick}
              disabled={startIndex + itemsPerPage >= data.length}
            >
              &gt;
            </button>
          </div>
        </div>
        {isLoadingDelete && (
          <dialog className={styles.deletingdialog} open>
            Deleting...
          </dialog>
        )}
        {!foundMatchingTasks && (
          // Display "Empty" message if no matching tasks were found
          <div className={styles.alllistdiv}>
            <div>
              <h3>Empty</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default TodoLists;
