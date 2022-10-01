import { TextField, Toolbar, ToolbarProps } from "@mui/material";
import { debounce } from "lodash";
import { useCallback } from "react";
import { FilterContext } from "../contexts/FilterContext";

const FilterRow = ({
  filters,
  onFilterChange,
  ...props
}: {
  filters: FilterContext;
  onFilterChange: (d: FilterContext) => void;
} & ToolbarProps) => {
  const onFilterChangeDebounced = useCallback(
    debounce((params: FilterContext) => {
      onFilterChange(params);
    }, 300),
    []
  );

  return (
    <Toolbar {...props}>
      <TextField
        placeholder="Search"
        InputProps={{ sx: { backgroundColor: "background.default" } }}
        sx={{ width: "100%", maxWidth: 300 }}
        size="small"
        defaultValue={filters?.s}
        onChange={(e) => onFilterChangeDebounced({ s: e.target.value })}
      />
    </Toolbar>
  );
};
export default FilterRow;
