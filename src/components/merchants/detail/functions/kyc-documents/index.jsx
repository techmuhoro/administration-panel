import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function KYCDocuments({ expanded, handleExpandedChange }) {
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel3-content" id="panel3-header">
        <Stack direction="row" columnGap={2}>
          <Typography>KYC Documents</Typography>
          {/* <Chip
            label="12% complete"
            color="error"
            variant="outlined"
            size="small"
          /> */}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
}
