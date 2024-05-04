import { useSnackbar } from "notistack";
import Modals from "./Modals";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { categories } from "../../constants";
import { useEffect, useState } from "react";
import useEditExpense from "../../hooks/useEditExpense";
import useAppContext from "../../hooks/useAppContext";

const EditExpenseModal = ({ expense }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setExpenses, budgetRemaining } = useAppContext();
  const [category, setCategory] = useState(expense.category);
  const editExpense = useEditExpense();
  const [values, setValues] = useState({
    title: expense?.title,
    price: String(expense?.price),
    date: expense.date,
  });

  useEffect(() => {
    if (expense) {
      setValues({
        title: expense?.title,
        price: String(expense?.price),
        date: expense?.date,
      });
      setCategory(expense?.category);
    }
  }, [expense]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const validateInput = () => {
    const { title, price, date } = values;

    if (title === "") {
      enqueueSnackbar("Title is a required field", { variant: "error" });
    } else if (price == "") {
      enqueueSnackbar("Price is required field", { variant: "error" });
    } else if (/^\d+$/.test(price) === false) {
      enqueueSnackbar("Price should contain only number", { variant: "error" });
    } else if (category === "") {
      enqueueSnackbar("Category is a required field", { variant: "error" });
    } else if (date === "") {
      enqueueSnackbar("Date is a required field", { variant: "error" });
    } else {
      return true;
    }
  };

  const handleEditExpense = (event) => {
    event.preventDefault();

    if (!validateInput()) return;

    const expensePrice = +values.price;
    const formData = {
      ...values,
      category,
      price: expensePrice,
    };

    const remainingBudgetAfterEdit =
      budgetRemaining + expense.price - expensePrice;

    if (remainingBudgetAfterEdit < 0) {
      enqueueSnackbar("Expense amount exceeds remaining budget", {
        variant: "error",
      });
      return;
    }

    setExpenses((prevExpenses) =>
      prevExpenses.map((expenseObj) => {
        if (expenseObj.id === expense.id) {
          return { ...expenseObj, ...formData };
        } else {
          return expenseObj;
        }
      })
    );

    enqueueSnackbar("Expense updated", { variant: "success" });
    editExpense.onClose();
  };

  const content = (
    <form className={styles.addExpense_form}>
      <Input
        id="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
      />
      <Input
        id="price"
        placeholder="Price"
        value={values.price}
        onChange={handleChange}
      />
      <Dropdown
        options={categories}
        placeholder="Select Category"
        value={category}
        onChange={handleCategoryChange}
      />
      <Input
        type="date"
        id="date"
        value={values.date}
        onChange={handleChange}
      />
      <button onClick={handleEditExpense} className="submit_btn">
        Edit Expense
      </button>
      <button
        type="button"
        className="cancel_btn"
        onClick={editExpense.onClose}
      >
        Cancel
      </button>
    </form>
  );
  return (
    <Modals
      title="Edit Expenses"
      open={editExpense.isOpen}
      onClose={editExpense.onClose}
      body={content}
    />
  );
};

export default EditExpenseModal;
