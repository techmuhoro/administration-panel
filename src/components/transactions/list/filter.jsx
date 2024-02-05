import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function TransactionsFilter() {
  return (
    <>
      <Button startIcon={<FilterAltIcon />} variant="outlined">
        Filter
      </Button>
    </>
  );
}
