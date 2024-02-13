import { useEffect, useState } from "react";
import userService, { User } from "./user-service";
import { CanceledError } from "./api-client";

const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        console.log(res.data[0].name);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);

        setLoading(false);
      })
      .finally(() => {
        //setLoading(false);
      });
    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError, setLoading };
};

export default useUser;
