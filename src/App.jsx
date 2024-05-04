import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker"
import RecentTransactions from "./components/RecentTransactions/RecentTransactions"
import TopExpenses from "./components/TopExpenses/TopExpenses"

const App = () => {
 
  return (
    <>
    {/* Expense Tracker */}
    <div>
      <h1 className="h1">Expense Tracker</h1>
      <ExpenseTracker />
    </div>

    <div className="bottom_container" >
      {/* Recent Transactions */}
      <div className="recent_transaction">
        <h2 className="h2">Recent Transactions</h2>
        <RecentTransactions />
      </div>

       {/* Recent Transactions */}
       <div>
        <h2 className="h2">Top Expenses</h2>
        <TopExpenses />
      </div>
    </div>

    <pre>
      <code>A</code>
    </pre>
    </>
  )
}

export default App