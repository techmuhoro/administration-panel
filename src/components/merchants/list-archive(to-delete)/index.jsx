import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import AddNew from "@/atoms/button/add-new";
import MerchantsFilter from "./filter";
import ReusableTable from "@/atoms/reusable-table";
import { columns, data } from "./columns";

export default function MerchantsList() {
  return (
    <>
      <Box>
        <Typography component="h1" variant="h5" mb={1}>
          Merchants
        </Typography>

        <StyledContentWrapper sx={{ px: 3, py: 3 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <AddNew text="New" />

            <MerchantsFilter />
          </Stack>

          <ReusableTable
            columns={columns}
            data={data}
            count={5}
            currentPage={1}
            rowsPerPage={5}
            totalPages={1}
            paginate={false}
          />
        </StyledContentWrapper>
      </Box>
    </>
  );
}
