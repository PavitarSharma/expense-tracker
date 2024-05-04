import useAppContext from "../../hooks/useAppContext";
import styles from "./RecentTransactions.module.css";
import { PiPizza, PiGift } from "react-icons/pi";
import { CiRollingSuitcase } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import { useCallback, useState } from "react";
import EditExpenseModal from "../Modals/EditExpenseModal";
import useEditExpense from "../../hooks/useEditExpense";

const RecentTransactions = () => {
  const { expenses, setExpenses } = useAppContext();
  const editExpense = useEditExpense();

  const [selectExpense, setSelectExpense] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);

  const handleDelete = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const handleSelectExpense = (expense) => {
    setSelectExpense(expense);
    editExpense.onOpen();
  };

  const prevPage = useCallback(
    () => setPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1)),
    []
  );
  const nextPage = () =>
    setPage((prevPage) =>
      prevPage === Math.ceil(expenses.length / limit) ? prevPage : prevPage + 1
    );

  const startIndex = (page - 1) * limit;
  const visibleExpenses = expenses.slice(startIndex, startIndex + limit);

  return (
    <>
      <div className={`box-white ${styles.transactions}`}>
        {expenses?.length > 0 &&
          expenses &&
          visibleExpenses.map((expense, index) => {
            const { title, price, category, id } = expense;
            const date = new Date(expense.date);

            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = date.toLocaleDateString("en-US", options);

            return (
              <div key={index} className={styles.transaction}>
                <div className={styles.left}>
                  <div className={styles.icon}>
                    {category === "food" ? (
                      <PiPizza />
                    ) : category === "entertainment" ? (
                      <PiGift />
                    ) : (
                      <CiRollingSuitcase />
                    )}
                  </div>
                  <div className={styles.des}>
                    <p>{title}</p>
                    <p>{formattedDate}</p>
                  </div>
                </div>
                <div className={styles.right}>
                  <p>₹{price}</p>
                  <div className={styles.actions_btns}>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className={styles.delete}
                    >
                      <IoCloseCircleOutline />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectExpense(expense)}
                      className={styles.edit}
                    >
                      <GoPencil />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        <div className={styles.pagination}>
          <button type="button" onClick={prevPage} className={styles.prev}>
            <HiOutlineArrowLongLeft />
          </button>
          <div className={styles.page}>{page}</div>
          <button type="button" onClick={nextPage} className={styles.next}>
            <HiOutlineArrowLongRight />
          </button>
        </div>
      </div>

      {selectExpense && editExpense.isOpen && (
        <EditExpenseModal expense={selectExpense} />
      )}
    </>
  );
};

export default RecentTransactions;
