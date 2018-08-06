import React from "react";
import PropTypes from "prop-types";

//! MATERIAL IMPORTS
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//! MATERIAL COMPONENTS
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

//! MATERIAL ICONS
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  gupyBg:{
    background: 'linear-gradient(-135deg,#1771ff,#16edc0)',
    textAlign: 'center'
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleComponentChange = props.handleComponentChange.bind(this);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} style={{ padding: 0 }}>
        <Paper>
          <Typography variant="display2" style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            Desafio Gupy
        </Typography>
          <Divider />
          <Typography variant="display1" style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            O que esperar da aplicação ?
        </Typography>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              O desafio era criar uma SPA <i>(Single Page Application)</i> usando uma framework do meu agradado e para isso eu usei o <b>ReactJS</b>!
          </Typography>
          </ListItem>
          <List>
            <ListItem>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body2">
                A aplicação deveria conter 2 telas apenas:
            </Typography>
            </ListItem>
            <ListItem button onClick={() => this.handleComponentChange(1)}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body2">
                A tela de cadastro de curriculos ...
            </Typography>
            </ListItem>
            <ListItem button onClick={() => this.handleComponentChange(2)}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body2">
                A tela de visualização dos curriculos cadastrados ...
            </Typography>
            </ListItem>
          </List>

          <Divider />
          <Typography variant="display1" style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            O que foi feito ?
          </Typography>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              A tela de cadastro de curriculos conectado ao <b>Firebase</b> para a persistencia do curriculo no banco no mesmo formato do <i>JSON</i> de candidatos que recebi!
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              A tela de edição com todos os 100 candidados do JSON base, porem, carregados a partir do Firebase tambem, além <b>do meu curriculo</b> que cadastrei como teste na plataforma porém com todos os dados reais. <b>:)</b>
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              Falando agora de tecnlogia, além do Firebase e do ReactJS, utilizei a <b>Material-UI</b> para que a aplicação pudesse tormar forma e que ficasse algo basicamente apresentavel!
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              Outro ponto na plataforma que merece destaque é a utilizando da API do Google, a GeoLocation, para que fosse possivel converter o endereço digitado em latitude e longitude. Para fazer a requisição eu utilizei o AXIOS para tornar as coisas um pouco mais facil  !
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body2">
              As rotas são controladas da forma mais simples possivel, utilizando o poder de renderização do React, ou seja, atraves de um index do component pai o 'App'.
          </Typography>
          </ListItem>
        </Paper>
        <div  style={{paddingTop: 20, paddingBottom: 20}}>
        <Paper className={classes.gupyBg}>
          <img src={require("../../Assets/Images/gupy-arrow.png")} />
        </Paper>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
