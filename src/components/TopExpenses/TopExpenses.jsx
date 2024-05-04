import useAppContext from "../../hooks/useAppContext";
import styles from "./TopExpenses.module.css";

const TopExpenses = () => {
  const { topExpenses } = useAppContext();
  return (
    <div className={`box-white ${styles.top_expenses}`}>
      {topExpenses.length > 0 &&
        topExpenses.map((expense, index) => {
          const { name, value } = expense;
          return (
            <div key={index} className={styles.expenses}>
              <p>{name}</p>
              <div className={styles.progress_container}>
                <div
                  className={styles.progress}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TopExpenses;
