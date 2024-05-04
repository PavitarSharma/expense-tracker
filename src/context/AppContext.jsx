import { createContext, useState } from "react";
import { expensesData } from "../constants";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(expensesData);
  const [balance, setBalance] = useState(4500);

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.price,
    0
  );
  const budgetRemaining = Math.max(0, balance - totalExpense);

  const aggregatedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.price;
    return acc;
  }, {});

  const totalExpenditure = Object.values(aggregatedExpenses).reduce(
    (total, expenditure) => total + expenditure,
    0
  );

  const topExpenses = Object.entries(aggregatedExpenses).map(
    ([category, expenditure]) => ({
      name: category,
      price: expenditure,
      value : parseFloat((expenditure / totalExpenditure * 100).toFixed(2))
    })
  );


  return (
    <AppContext.Provider
      value={{
        expenses,
        setExpenses,
        balance,
        setBalance,
        totalExpense,
        budgetRemaining,
        topExpenses
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
