import { Dashboard } from '@cdw/pages';
import { Header } from '@cdw/components';
import { Box, Grid, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { navigate } from 'gatsby';

export default function DashboardPage() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={1} sx={{ backgroundColor: '#1D5AA2', color: 'white' }}>
          <List>
            <ListItem button key="home" onClick={() => navigate('/dashboard')}>
              <ListItemIcon>
                <HomeIcon style={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={11}>
          <Stack>
            <Header />
            <Dashboard />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
