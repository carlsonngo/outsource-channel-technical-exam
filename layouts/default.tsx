import { AppBar, Box, Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import DrawerNav from "../components/DrawerNav";
import FilterRow from "../components/FilterRow";
import { FilterContext } from "../contexts/FilterContext";

const DefaultLayout = ({ children }: any) => {
  const [filters, setFilters] = useState<FilterContext>({ s: "" });

  return (
    <FilterContext.Provider value={filters}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <FilterRow
          filters={filters}
          onFilterChange={setFilters}
          sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}
        />
      </AppBar>
      <Box display="flex">
        <DrawerNav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            backgroundColor: grey[50],
            minHeight: "100vh",
            overflowY: "hidden",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </FilterContext.Provider>
  );
};

export default DefaultLayout;
