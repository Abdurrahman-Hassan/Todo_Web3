import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import TodoLists from "../components/TodoLists";
import { PiStampBold } from "react-icons/pi";
import { useRouter } from "next/router";

export default function Home() {
  const address = useAddress();
  const router = useRouter();
  return (
    <div className={styles.homepagemaindiv}>
      <div className={styles.listmain}>
        <div className={styles.topcirclediv}>
          <ConnectWallet />
          <PiStampBold />
        </div>
        <div className={styles.mainlistdiv}>{address && <TodoLists />}</div>
      </div>
      <div className={styles.newbtndiv}>
        {address && (
          <button
            className={styles.newbtn}
            onClick={() => {
              router.push("/AddTodo");
            }}
          >
            NEW
          </button>
        )}
      </div>
    </div>
  );
}
