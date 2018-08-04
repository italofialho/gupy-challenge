import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';

//! MATERIAL ICONS
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

//!TOOLS
import _ from 'underscore';
import moment from 'moment';


function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
  { id: 'score', numeric: true, disablePadding: false, label: 'Score' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'birthDate', numeric: false, disablePadding: false, label: 'Data de nascimento' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gênero' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Endereço' },
];

class ViewCandidatesHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ViewCandidatesHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let ViewCandidatesToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        <Typography variant="title" id="tableTitle">
          Candidatos
          </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

ViewCandidatesToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

ViewCandidatesToolbar = withStyles(toolbarStyles)(ViewCandidatesToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ViewCandidates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'score',
      selectedCandidates: [],
      candidatesList: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount = () => {
    this.loadCandidatesList();
  };

  loadCandidatesList() {
    const candidates = require("../../Assets/JSON/candidates.json");
    let candidatesList = _.map(candidates, candidate => {
      candidate.score = parseFloat((Math.random() * 10)).toFixed(2);;
      return candidate;
    });
    this.setState({ candidatesList });
  };


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selectedCandidates.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { candidatesList, order, orderBy, selectedCandidates, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, candidatesList.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <ViewCandidatesToolbar numSelected={selectedCandidates.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ViewCandidatesHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={candidatesList.length}
            />
            <TableBody>
              {candidatesList
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n._id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={n._id}
                    >
                      <TableCell numeric>{n.score}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{moment(n.birthDate.split(" ")[0]).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{n.gender === "male" ? "Homem" : n.gender === "female" ? "Mulher" : "--"  }</TableCell>
                      <TableCell>{n.phone}</TableCell>
                      <TableCell>{n.address}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={candidatesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Página anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Próxima pagina',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ViewCandidates.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewCandidates);