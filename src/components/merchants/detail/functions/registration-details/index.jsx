import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
} from "@/components/merchants/detail/ui";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function RegistrationDetails({
  expanded,
  handleExpandedChange,
}) {
  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel2-content" id="panel2-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Registration Details</Typography>
          <Chip
            label="55% complete"
            color="primary"
            variant="outlined"
            size="small"
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
}
