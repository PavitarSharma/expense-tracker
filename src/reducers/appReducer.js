export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, payload],
      };
    default:
      return state;
  }
};
