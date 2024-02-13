interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
}

interface Expenses {
  expenses?: Expense[];
  onRemove: (id: number) => void;
}

const ExpenseList = ({ expenses, onRemove }: Expenses) => {
  if (expenses?.length === 0) return null;

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {expenses?.map((exp) => (
          <tr key={exp.id}>
            <th scope="row">{exp.description}</th>
            <td>{exp.amount}</td>
            <td>{exp.category}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onRemove(exp.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            Total :Rs
            {expenses?.reduce((acc, e) => e.amount + acc, 0).toFixed(2)}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
