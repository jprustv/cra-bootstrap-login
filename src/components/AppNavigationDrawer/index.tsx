import React, { useState, useEffect, useContext } from 'react'
import { Link, RouteProps} from 'react-router-dom'

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Logo from '../../assets/images/logo.png'

import { AuthContext } from '../../contexts/auth'

import './styles.css'

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core'

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  Restore as  RestoreIcon
} from '@material-ui/icons'

const drawerWidth = 180;

const theme_dark = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: 'var(--color-primary)',
      color : 'var(--color-title-in-primary)',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface DefaultProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

type Props = DefaultProps & RouteProps;

const AppNavigationDrawer : React.FC<Props> = (props: Props) => {

  const classes = useStyles();
  const theme = useTheme();

  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { signOut } = useContext(AuthContext)
  
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    // Placeholder for OnLoad Event
  }

  const handleSettingsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerLink = () => {
    setMobileOpen(false);
  }


  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <>
    <div className={classes.toolbar}>
      <img className={mobileOpen ? "logo-mobile" : "logo"} src={Logo} alt="Logo Alt Text"/>
      <Hidden smUp implementation="css">
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Hidden>
    </div>

    <Divider />

    <List>
      <ListItem button key="Dashboard" component={Link} to="/" onClick={handleDrawerLink}>
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button key="AboutUs" component={Link} to="/about" onClick={handleDrawerLink}>
        <ListItemIcon><LanguageIcon /></ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItem>
    </List>

    <footer>
      <span>
        {/* Texto Footer Placeholder  */}
      </span>
    </footer>

    </>
  );

  return (

    <ThemeProvider theme={theme_dark}>
    <div className={classes.root}>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />

          </IconButton>
          <Typography variant="h6" noWrap>
            
          </Typography>
          <span className="options">
            <IconButton
              color="inherit"
              aria-label="Options Menu"
              edge="end"
              onClick={handleSettingsMenuClick}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
                <SettingsIcon />
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={signOut}>
                <ListItemIcon>
                  <RestoreIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </span>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      
            {/* props.children aqui se refere às rotas! */}
            {props.children}
      
      </main>
    </div>
    </ThemeProvider>
  )
}

export default React.memo(AppNavigationDrawer)
