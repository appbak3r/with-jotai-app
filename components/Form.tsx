import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { removeUserFromLocalStorage, usersFamily } from "../store";

type Values = {
  name: string;
  email: string;
};

const defaultValues: Values = {
  name: "John Doe",
  email: "",
};

export const Form = ({ id }: { id: string }) => {
  const [user, setUser] = useAtom(usersFamily(id));

  const { register, handleSubmit, watch } = useForm<Values>({
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
        }
      : defaultValues,
  });

  watch((values) => {
    setUser({
      id,
      name: values?.name ?? "",
      email: values?.email ?? "",
    });
  });

  const onSubmit = () => {
    removeUserFromLocalStorage(id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />
      <button type="submit">Submit</button>
    </form>
  );
};
