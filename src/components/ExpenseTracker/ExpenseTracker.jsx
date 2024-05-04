import useAddBalance from "../../hooks/useAddBalance";
import useAddExpense from "../../hooks/useAddExpense";
import useAppContext from "../../hooks/useAppContext";
import ExpensePieChart from "../Chart/PieChart";
import AddBalanceModal from "../Modals/AddBalanceModal";
import AddExpenseModal from "../Modals/AddExpenseModal";
import styles from "./ExpenseTracker.module.css";

const ExpenseTracker = () => {
  const { totalExpense, budgetRemaining} = useAppContext();
  const addExpense = useAddExpense();
  const addBalance = useAddBalance();


  return (
    <>
      <div className={styles.expense_tracker}>
        <div className={`box-light-gray ${styles.expense_box}`}>
          <p>
            Wallet Balance: <span>₹{budgetRemaining}</span>
          </p>
          <button onClick={addBalance.onOpen} className={styles.wallet_btn}>
            + Add Income
          </button>
        </div>

        <div className={`box-light-gray ${styles.expense_box}`}>
          <p>
            Expenses: <span className={styles.balance}>₹{totalExpense}</span>
          </p>
          <button onClick={addExpense.onOpen} className={styles.expenses_btn}>
            + Add Expense
          </button>
        </div>

        <ExpensePieChart />
      </div>
      <AddExpenseModal />
      <AddBalanceModal />
    </>
  );
};

export default ExpenseTracker;
