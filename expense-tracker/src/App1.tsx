import { useState } from "react";
import ExpenseList from "./Components/ExpenseList";
import ExpenseCategory from "./Components/ExpenseCategory";
import ExpenseForm from "./Components/ExpenseForm";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpense] = useState([
    {
      id: 1,
      description: "Mac book Air",
      amount: 100000,
      category: "electronics",
    },
    {
      id: 2,
      description: "Iphone",
      amount: 52000,
      category: "electronics",
    },
    {
      id: 3,
      description: "T shirts",
      amount: 52000,
      category: "clothing",
    },
  ]);

  const onRemove = (id: number) => {
    setExpense(expenses.filter((c) => c.id !== id));
  };

  const onSelectedCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  };

  // const onSubmit = (data: {}) => {
  //   setExpense([...expenses, { ...data, id: expenses.length + 1 }]);
  // };

  const visibleExpenses = selectedCategory
    ? expenses.filter((c) => c.category === selectedCategory)
    : expenses;

  return (
    <>
      <ExpenseForm
        onSubmit={(data) =>
          setExpense([...expenses, { ...data, id: expenses.length + 1 }])
        }
      ></ExpenseForm>
      <br></br>
      <ExpenseCategory
        onSelectedCategory={(selectedCategory) =>
          onSelectedCategory(selectedCategory)
        }
      ></ExpenseCategory>
      <br></br>
      <div>
        <ExpenseList
          expenses={visibleExpenses}
          onRemove={(id) => onRemove(id)}
        ></ExpenseList>
      </div>
    </>
  );
}

export default App;
