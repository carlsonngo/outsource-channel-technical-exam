import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SubmissionSearchParams = {
  s?: string;
};

function useFavorites(
  queryKey: string = "favorites",
  params?: SubmissionSearchParams
) {
  return useQuery([queryKey, params], async () => {
    const { data } = await axios.get(
      `/api/favorites?${new URLSearchParams(params).toString()}`
    );

    return data;
  });
}

export default useFavorites;
