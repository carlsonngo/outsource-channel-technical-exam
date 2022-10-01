import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SubmissionSearchParams = {
  s?: string;
};

function useSubmissions(
  queryKey: string = "submissions",
  params?: SubmissionSearchParams
) {
  return useQuery([queryKey, params], async () => {
    const { data } = await axios.get(
      `/api/submissions?${new URLSearchParams(params).toString()}`
    );

    return data;
  });
}

export default useSubmissions;
