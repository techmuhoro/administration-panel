import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UserAvatar() {
  const router = useRouter();

  return (
    <Stack
      direction="row"
      alignItems="center"
      onClick={() => router.push("/dashboard/user-profile")}
      justifyContent="center"
      columnGap={1}
      sx={{
        cursor: "pointer",
      }}
    >
      <Typography>James</Typography>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <PersonIcon />
        <ExpandMoreIcon fontSize="small" sx={{ ml: -1 }} />
      </Stack>
    </Stack>
  );
}
