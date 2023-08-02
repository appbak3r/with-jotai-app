import { useAtom, useSetAtom } from "jotai";
import { allUsers, usersAtom } from "../store";
import { Form } from "./Form";
import { nanoid } from "nanoid";
import { Suspense } from "react";

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
          <Suspense fallback="loading data..." key={user.id}>
            <Form id={user.id} />
          </Suspense>
        ),
      )}
      <button onClick={onAddUser}>Add user</button>
    </>
  );
};
