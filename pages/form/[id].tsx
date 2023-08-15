import { useRouter } from "next/router";
import { Suspense } from "react";
import { Form } from "../../components/Form";

const FormPage = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <Suspense fallback="loading data..." key={id as string}>
      <Form id={id as string} />
    </Suspense>
  );
};

export default FormPage;
