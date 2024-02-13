import userService, { User } from "./services/user-service";
import useUser from "./services/useUsers";

const App = () => {
  const { users, error, isLoading, setUsers, setError, setLoading } = useUser();

  const updateUser = (user: User) => {
    setLoading(true);

    const originalUsers = [...users];

    const updatedUser = { ...user, name: "machina" };

    setUsers(users.map((c) => (c.id === user.id ? updatedUser : c)));

    userService
      .update(updatedUser)
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];

    setLoading(true);
    const newuser = { id: users.length + 1, name: "sats velke" + users.length };
    setUsers([newuser, ...users]);

    userService
      .add<User>(newuser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteUser = (user: User) => {
    setLoading(true);
    const originalUsers = [...users];

    setUsers(users.filter((c) => c.id !== user.id));

    userService
      .delete(user.id)
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading && <span className="spinner-border"></span>}
      {error && <p className="text text-danger">{error}</p>}

      <div>
        <button onClick={() => addUser()} className="btn btn-primary">
          Add
        </button>
        <br></br>
        <br></br>
        <ul className="list-group">
          {users.map((c) => (
            <li
              className="list-group-item  d-flex justify-content-between"
              key={c.id}
            >
              {c.name} {""}
              <button onClick={() => updateUser(c)} className="btn btn-primary">
                Update
              </button>
              <button onClick={() => deleteUser(c)} className="btn btn-danger ">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
