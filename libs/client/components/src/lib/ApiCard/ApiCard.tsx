import { Button, Paper, Stack, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

/* eslint-disable-next-line */
export interface ApiCardProps {
  apiId: string;
  name: string;
  description?: string;
  isPublic?: boolean;
  onClick?: (apiId: string) => void;
}

export function ApiCard({
  apiId,
  name,
  description,
  isPublic = false,
  onClick,
}: ApiCardProps) {
  const handleClick = () => {
    onClick && onClick(apiId);
  };

  return (
    <Paper>
      <Stack spacing={{ xs: 1, sm: 2 }} sx={{ p: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h2">{name}</Typography>
          {isPublic && <LockOpenIcon />}
        </Stack>
        <Typography variant="body1">{description}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" onClick={() => handleClick()}>
            Explore API
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default ApiCard;
