import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

export type User = {
  id: string;
  name?: string;
  email?: string;
};

const remoteUsersAtom = atom(async () => {
  return await new Promise<User[]>((resolve) => {
    resolve([
      {
        id: "abc",
      },
      {
        id: "def",
      },
    ]);
  });
});

export const removeUserFromLocalStorage = (id: string) => {
  const users = localStorage.getItem("users");
  if (users) {
    const parsedUsers = JSON.parse(users);
    delete parsedUsers[id];
    localStorage.setItem("users", JSON.stringify(parsedUsers));
  }
};

export const allUsers = atom((get) => {
  const remoteUsers = get(remoteUsersAtom);
  const users = get(usersAtom);

  const allUsers = [...remoteUsers, ...Array.from(users.values())];

  if (remoteUsers.length > 0) {
  }

  return new Map(allUsers.map((user) => [user.id, user]));
});

export const usersAtom = atomWithStorage<Map<string, User>>(
  "users",
  new Map(),
  {
    getItem: (key) => {
      const item = localStorage.getItem(key);
      console.log(item);
      if (item) {
        const parsedItem = JSON.parse(item);
        const map = new Map<string, User>();

        Object.keys(parsedItem).forEach((key) => {
          map.set(key, parsedItem[key]);
        });
        return map;
      }
      return new Map();
    },
    setItem: (key, newValue) => {
      localStorage.setItem(key, JSON.stringify(Object.fromEntries(newValue)));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  },
);

export const remoteUserFamily = atomFamily((id: string) => {
  return atom(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id,
      name: "Remote User",
      email: "remote@gmail.com",
    };
  });
});

export const usersFamily = atomFamily((id: string) =>
  atom(
    (get) => {
      const remoteUsers = get(remoteUsersAtom);
      const users = get(usersAtom);

      const user = remoteUsers.find((user) => user.id === id);
      const localUser = users.get(id);

      if (localUser) {
        return localUser;
      }

      if (user) {
        return get(remoteUserFamily(id));
      }
    },
    (get, set, arg: User) => {
      const users = get(usersAtom);
      const newUsers = new Map(users);
      newUsers.set(arg.id, arg);
      set(usersAtom, newUsers);
    },
  ),
);
