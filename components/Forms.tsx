import { useAtom } from "jotai";
import { usersAtom } from "../store";
import { Form } from "./Form";

export const Forms = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const onAddUser = () => {
    const id = Math.floor(Math.random() * 1000);

    setUsers((users) => {
      const newUsers = new Map(users);
      newUsers.set(id, {
        id,
        name: "John Doe",
        email: "",
      });

      return newUsers;
    });
  };

  return (
    <>
      {Array.from(users.values()).map((user) => (
        <Form key={user.id} id={user.id} />
      ))}
      <button onClick={onAddUser}>Add user</button>
    </>
  );
};
