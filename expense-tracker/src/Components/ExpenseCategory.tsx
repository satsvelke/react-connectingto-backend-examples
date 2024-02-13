import categories from "./categories";

interface ExpenseCategoryProps {
  onSelectedCategory: (selectedCategory: string) => void;
}

const ExpenseCategory = ({ onSelectedCategory }: ExpenseCategoryProps) => {
  return (
    <select
      onChange={(event) => onSelectedCategory(event.target.value)}
      className="form-select"
      aria-label="Default select example"
    >
      <option selected>Open this select menu</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default ExpenseCategory;
