import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

export type User = {
  id: number;
  name: string;
  email: string;
};

const defaultUsers = new Map<number, User>();

defaultUsers.set(1, {
  id: 1,
  name: "John Doe",
  email: "",
});

export const usersAtom = atomWithStorage<Map<number, User>>(
  "users",
  defaultUsers,
  {
    getItem: (key) => {
      const item = localStorage.getItem(key);
      console.log(item);
      if (item) {
        const parsedItem = JSON.parse(item);
        const map = new Map<number, User>();

        Object.keys(parsedItem).forEach((key) => {
          map.set(parseInt(key), parsedItem[key]);
        });
        return map;
      }
      return defaultUsers;
    },
    setItem: (key, newValue) => {
      localStorage.setItem(key, JSON.stringify(Object.fromEntries(newValue)));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  },
);

export const usersFamily = atomFamily((id: number) =>
  atom(
    (get) => get(usersAtom).get(id),
    (get, set, arg: User) => {
      const users = get(usersAtom);
      const newUsers = new Map(users);
      newUsers.set(arg.id, arg);
      set(usersAtom, newUsers);
    },
  ),
);
