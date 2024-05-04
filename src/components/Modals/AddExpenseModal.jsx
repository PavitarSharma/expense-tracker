import { useSnackbar } from "notistack";
import Modals from "./Modals";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import Dropdown from "../Dropdown/Dropdown";
import { categories } from "../../constants";
import { useEffect, useState } from "react";
import useAddExpense from "../../hooks/useAddExpense";
import useAppContext from "../../hooks/useAppContext";
import { v4 as uuidv4 } from 'uuid';

const AddExpenseModal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState("");
  const addExpense = useAddExpense();
  const [values, setValues] = useState({
    title: "",
    price: "",
    date: "",
  });
  const { setExpenses , budgetRemaining} = useAppContext();

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

  const handleAddExpense = (event) => {
    event.preventDefault();

    if (!validateInput()) return;

    if(budgetRemaining === 0){
      enqueueSnackbar("Insufficient Balance", { variant: "error" });
      return;
    }

    const expensePrice = +values.price;

    if (expensePrice > budgetRemaining) {
        enqueueSnackbar("Expense amount exceeds current balance", { variant: "error" });
        return;
    }
    
    const formData = {
      ...values,
      category,
      price: +values.price,
      id: uuidv4(),
    
    };

    setExpenses((prevExpenses) => [formData, ...prevExpenses])
    enqueueSnackbar("Expense added", { variant: "success" });
    setValues({
      title: "",
      price: "",
      date: "",
    });
    setCategory("");
    addExpense.onClose();
  };

  useEffect(() => {
    if (!addExpense.isOpen) {
      setCategory("");
      setValues({
        title: "",
        price: "",
        date: "",
      });
    }
  }, [addExpense.isOpen]);

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
      <button onClick={handleAddExpense} className="submit_btn">
        Add Expense
      </button>
      <button type="button" className="cancel_btn" onClick={addExpense.onClose}>
        Cancel
      </button>
    </form>
  );
  return (
    <Modals
      title="Add Expenses"
      open={addExpense.isOpen}
      onClose={addExpense.onClose}
      body={content}
    />
  );
};

export default AddExpenseModal;
