import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pageIndex: 1,
      showLoginSnackbar: false,
      snackbarMessage: "",
      showSidebar: false
    };


  };

  prepareSimpleRoute = () => {

  };

  getComponentTitle = () => {
    const { pageIndex } = this.state;

    switch (pageIndex) {
      case 0:
        return "Cadastro manual de currículos";
      case 1:
        return "Visualização de currículos cadastrados";
      default:
        return "--";
    }
  };

  prepareSidebarMenus = () => {
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Send mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </div>
    )
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

  hideSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showLoginSnackbar: false });
  };

  renderSidebar = () => {
    return (
      <Drawer open={this.state.showSidebar} onClose={() => this.toggleDrawer(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => this.toggleDrawer(false)}
          onKeyDown={() => this.toggleDrawer(false)}
        >
          {this.prepareSidebarMenus()}
        </div>
      </Drawer>
    )
  };

  renderHeader = () => {
    const { classes } = this.props;
    const loginMessageString = "Ainda estamos construindo essa funcionalidade na plataforma! Você pode tentar novamente mais tarde.";
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>{this.getComponentTitle()}</Typography>
            <Button color="inherit" onClick={() => this.showSnackbar(loginMessageString)}>Login</Button>
          </Toolbar>
        </AppBar>
        {this.renderSelectedComponent()}
      </div>
    )
  };

  renderSelectedComponent = () => {


  };

  renderSnackbar = () => {
    const { classes } = this.props;
    const { snackbarMessage } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.showLoginSnackbar}
        autoHideDuration={6000}
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
    return (
      <div>
        {this.renderHeader()}
        {this.renderSidebar()}
        {this.renderSnackbar()}
      </div>
    );
  };
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  }
});


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
