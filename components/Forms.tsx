import { useAtom, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import Link from "next/link";
import { allUsers, usersAtom } from "../store";

export const Forms = () => {
  const [users] = useAtom(allUsers);
  const setUsers = useSetAtom(usersAtom);
  const onAddUser = () => {
    setUsers((localUsers) => {
      const newUsers = new Map(localUsers);

      if (users.size === 0) {
        const id = nanoid();

        newUsers.set(id, {
          id: id,
          name: "John Doe",
          email: "",
        });
      }

      const id = nanoid();

      newUsers.set(id, {
        id,
        name: "John Doe",
        email: "",
      });

      return newUsers;
    });
  };

  const fakeId = nanoid();

  return (
    <>
      {(users.size === 0 ? [{ id: fakeId }] : Array.from(users.values())).map(
        (user) => (
          <Link href={`/form/${user.id}`}>Open form #{user.id}</Link>
        ),
      )}
      <button onClick={onAddUser}>Add user</button>
    </>
  );
};
