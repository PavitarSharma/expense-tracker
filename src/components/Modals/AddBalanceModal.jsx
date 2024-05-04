import { useSnackbar } from "notistack";
import Modals from "./Modals";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import useAddBalance from "../../hooks/useAddBalance";
import useAppContext from "../../hooks/useAppContext";
import { useState } from "react";

const AddBalanceModal = () => {
  const { enqueueSnackbar } = useSnackbar();

  const addBalance = useAddBalance();
  const { setBalance } = useAppContext();

  const [amount, setAmount] = useState("");

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const validateInput = () => {
    if (amount === "") {
      enqueueSnackbar("Add your income amount", { variant: "error" });
    } else if (/^\d+$/.test(amount) === false) {
      enqueueSnackbar("Income amount should contain only number", {
        variant: "error",
      });
    } else {
      return true;
    }
  };

  const handleAddBalance = (event) => {
    event.preventDefault();

    if (!validateInput()) return;

    const newAmount = +amount;
    setBalance((prevBalance) => (prevBalance += newAmount));

    enqueueSnackbar("Balance added", { variant: "success" });

    addBalance.onClose();
  };

  const content = (
    <form className={styles.addBalance}>
      <Input
        id="amount"
        placeholder="Income Amount"
        value={amount}
        onChange={handleChange}
      />

      <button onClick={handleAddBalance} className="submit_btn">
        Add Balance
      </button>
      <button type="button" className="cancel_btn" onClick={addBalance.onClose}>
        Cancel
      </button>
    </form>
  );
  return (
    <Modals
      title="Add Balance"
      open={addBalance.isOpen}
      onClose={addBalance.onClose}
      body={content}
    />
  );
};

export default AddBalanceModal;
