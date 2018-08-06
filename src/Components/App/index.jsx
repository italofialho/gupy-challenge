import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

//! MATERIAL ICONS
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

//! COMPONENTS
import ManualRegistration from '../ManualRegistration';
import ViewCandidates from '../ViewCandidates';
import Home from '../Home';

class App extends Component {

  constructor(props) {
    super(props);

    const localPageIndex = localStorage.getItem("pageIndex");
    this.state = {
      pageIndex: localPageIndex ? parseInt(localPageIndex) : 0,
      showLoginSnackbar: false,
      snackbarMessage: "",
      showSidebar: false
    };

  };

  getComponent = () => {
    const { pageIndex } = this.state;
    switch (pageIndex) {
      case 0:
        return <Home handleComponentChange={(pageIndex) => this.handleComponentChange(pageIndex)} />
      case 1:
        return (
          <ManualRegistration
            showSnackbar={(snackbarMessage) => this.showSnackbar(snackbarMessage)}
            handleComponentChange={(pageIndex) => this.handleComponentChange(pageIndex)} />
        );
      case 2:
        return (
          <ViewCandidates
            showSnackbar={(snackbarMessage) => this.showSnackbar(snackbarMessage)}
            handleComponentChange={(pageIndex) => this.handleComponentChange(pageIndex)} />
        );
      default:
        return null;
    }
  };

  getComponentTitle = () => {
    const { pageIndex } = this.state;

    switch (pageIndex) {
      case 0:
        return "Inicio"
      case 1:
        return "Cadastro manual de currículos";
      case 2:
        return "Visualização de currículos cadastrados";
      default:
        return "--";
    }
  };

  prepareSidebarMenus = () => {
    return (
      <div>
        <ListItem button onClick={() => this.handleComponentChange(0)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => this.handleComponentChange(1)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Novo currículo" />
        </ListItem>
        <ListItem button onClick={() => this.handleComponentChange(2)}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Visualizar currículos" />
        </ListItem>
      </div>
    )
  };

  handleComponentChange = (pageIndex) => {
    localStorage.setItem("pageIndex", pageIndex);
    this.setState({ pageIndex });
  };

  toggleDrawer = (status) => {
    this.setState({ showSidebar: status });
  };

  showSnackbar = (snackbarMessage) => {
    this.setState({
      showLoginSnackbar: true,
      snackbarMessage
    });
  };

  hideSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showLoginSnackbar: false });
  };

  renderSidebar = () => {
    const { classes, theme } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.showSidebar && classes.drawerPaperClose),
        }}
        open={this.state.showSidebar}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => this.toggleDrawer(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>{this.prepareSidebarMenus()}</List>
        <Divider />
      </Drawer>
    )
  };

  renderHeader = () => {
    const { classes } = this.props;
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, this.state.showSidebar && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.state.showSidebar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => this.toggleDrawer(true)}
            className={classNames(classes.menuButton, this.state.showSidebar && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap className={classes.flex}>
            {this.getComponentTitle()}
          </Typography>
          <img src={require("../../Assets/Images/gupy-logo.png")} style={{ paddingRight: 25 }} />
        </Toolbar>
      </AppBar>
    )
  };

  renderSelectedComponent = () => {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.getComponent()}
      </main>
    );

  };

  renderSnackbar = () => {
    const { snackbarMessage } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.showLoginSnackbar}
        autoHideDuration={3000}
        onClose={(e, r) => this.hideSnackbar(e, r)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snackbarMessage}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={(e, r) => this.hideSnackbar(e, r)}>
            OK
            </Button>
        ]}
      />
    )
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderHeader()}
        {this.renderSidebar()}
        {this.renderSelectedComponent()}
        {this.renderSnackbar()}
      </div>
    );
  };
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flexGrow: 1,
  }
});


App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
