import axios from "axios";
import { useMutation, queryCache } from "react-query";

export default function useCreatePosts() {
  return useMutation(
    (values) => axios.post("url", values).then((res) => res.data),
    {
      onMutate: (values) => {
        const previousPosts = queryCache.getQueryData("posts");
        queryCache.setQueryData("posts", (old) => [
          ...old,
          {
            id: "temp",
            ...values,
          },
        ]);
        return () => queryCache.setQueryData("posts", previousPosts);
      },
      onSuccess: () => queryCache.refetchQueries("posts"),
    }
  );
}
