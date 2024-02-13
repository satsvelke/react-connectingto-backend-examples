import categories from "./categories";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ExpenseFormProps {
  onSubmit: (data: FormData) => void;
}

const schema = z.object({
  description: z.string().min(10),
  amount: z.number().min(1).max(10000000),
  category: z.enum(categories),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          {...register("description")}
          type="text"
          className="form-control"
          id="description"
          placeholder="Example input"
        />
        {errors.description && (
          <p className="text text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="text"
          className="form-control"
          id="amount"
          placeholder="Another input"
        />
        {errors.amount && (
          <p className="text text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          {...register("category")}
          className="form-control"
          id="category"
        >
          <option selected>Select Something</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text text-danger">{errors.category.message}</p>
        )}
      </div>
      <div className="form-group">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
