import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import PaletteIcon from "@material-ui/icons/Palette";
import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

export interface AppDrawerProps {
  open?: boolean;
  checked?: boolean;
  onChange: () => void;
  menu?: {
    icon?: (props: SvgIconProps) => JSX.Element;
    label?: string | number;
    path?: string;
    isActive?: boolean;
  }[];
}

export const AppDrawer: FunctionComponent<AppDrawerProps> = (props) => {
  const theme = useTheme();

  const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      listBox: {
        flex: 1,
        paddingTop: "4rem",
      },
      list: {
        minWidth: "16rem",
      },
      listItem: {
        paddingLeft: "1.5rem",
      },
      routerLink: {
        textDecoration: "none",
      },
      themeItem: {
        display: "flex",
        alignItems: "center",
        padding: "0 .5rem 0 1.5rem",
      },
      themeItemLabel: {
        flex: "1",
        marginLeft: "2rem",
      },
    });
  });

  const classes = useStyles();

  const handleMenuClick = () => {
    delete sessionStorage.manifest;
    delete sessionStorage.step;
    delete sessionStorage.completedStep;
  };

  return (
    <Box className={classes.listBox}>
      <List className={classes.list}>
        {props.menu
          .filter((o) => o.isActive === true)
          .map((o, k) => (
            <RouterLink
              to={o.path}
              className={classes.routerLink}
              style={{ color: theme.palette.secondary.main }}
              key={o.label}
            >
              <ListItem
                button
                className={classes.listItem}
                onClick={handleMenuClick}
              >
                <ListItemIcon>
                  <Box
                    component={o.icon}
                    style={{ color: theme.palette.secondary.main }}
                  />
                </ListItemIcon>
                <ListItemText primary={o.label} />
              </ListItem>
            </RouterLink>
          ))}
      </List>
      <div
        className={classes.themeItem}
        style={{
          color: theme.palette.secondary.main,
          cursor: props.open ? "inherit" : "pointer",
        }}
        onClick={props.onChange}
      >
        {props.checked ? <Brightness7Icon /> : <Brightness4Icon />}
        <span className={classes.themeItemLabel}>
          {props.checked ? "Dark " : "Light"} Theme
        </span>
        <Switch checked={props.checked} onChange={props.onChange} />
      </div>
    </Box>
  );
};

export default AppDrawer;
