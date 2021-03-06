import { Button, Paper, PaperProps, Stack, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

/* eslint-disable-next-line */
export interface ApiCardProps extends Omit<PaperProps, 'onClick'> {
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
  ...props
}: ApiCardProps) {
  const handleClick = () => {
    onClick && onClick(apiId);
  };

  return (
    <Paper sx={{ height: '100%', display: 'inline-flex' }} {...props}>
      <Stack
        direction="column"
        justifyContent="space-between"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ height: '100%', p: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h3">{name}</Typography>
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
