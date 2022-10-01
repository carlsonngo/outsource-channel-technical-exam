import type { StackProps } from "@mui/material";
import { Stack } from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
import SubmissionCard from "./SubmissionCard";

const SubmissionList = ({
  query,
  queryKey,
  canLike,
  ...props
}: {
  query: (queryKey: string, params?: any) => UseQueryResult<any>;
  queryKey: string;
  canLike?: boolean;
} & StackProps) => {
  const filters = useContext(FilterContext);
  const { data } = query(queryKey, filters);

  return (
    <Stack spacing={2} {...props}>
      {/* can possibly contain count/pagination values */}
      {data?.data?.map((d: any) => (
        <SubmissionCard
          key={d.id}
          id={d.id}
          title={d.title}
          fullLink={d.full_link}
          selfText={d.selftext}
          score={d.score}
          favorite={d.favorite}
          canLike={canLike}
          queryKey={queryKey}
        />
      ))}
    </Stack>
  );
};

export default SubmissionList;
