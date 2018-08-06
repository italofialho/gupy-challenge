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
            O que esperar da aplicação?
        </Typography>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              O desafio era criar uma SPA <i>(Single Page Application)</i> usando uma framework do meu agradado e para isso eu usei o <b>ReactJS</b>!
          </Typography>
          </ListItem>
          <List>
            <ListItem>
              <ListItemIcon>
                <KeyboardArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body1">
                A aplicação deveria conter 2 telas apenas:
            </Typography>
            </ListItem>
            <ListItem button onClick={() => this.handleComponentChange(1)}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body1">
                A tela de cadastro de currículos ...
            </Typography>
            </ListItem>
            <ListItem button onClick={() => this.handleComponentChange(2)}>
              <ListItemIcon>
                <SubdirectoryArrowRightIcon />
              </ListItemIcon>
              <Typography variant="body1">
                A tela de visualização dos currículos cadastrados ...
            </Typography>
            </ListItem>
          </List>

          <Divider />
          <Typography variant="display1" style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20 }}>
            O que foi feito?
          </Typography>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              A tela de cadastro de currículos conectado ao <b>Firebase</b> para a persistência do currículo no banco no mesmo formato do <i>JSON</i> de candidatos que recebi!
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              A tela de visualização com todos os 100 candidatos do JSON base, porém, carregados a partir do <b>Firebase</b> também, além <b>do meu currículo</b> que cadastrei como teste na plataforma porém com todos os dados reais. <b>:)</b>
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              Outro ponto na tela de visualização é o botão de visualização/edição no canto direito da tabela. Que ao clicar abre um Dialog que possibilita a visualização e edição de uma forma rápida de todos os dados do candidato!
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              Falando agora de tecnologia, além do <b>Firebase</b> e do <b>ReactJS</b>, utilizei a <b>Material-UI</b> para que a aplicação pudesse tomar forma e que ficasse algo basicamente apresentável!
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              Outro ponto na plataforma que merece destaque é a utilizando da API do Google, a <b>GeoLocation</b>, para que fosse possível converter o endereço digitado em latitude e longitude. Para fazer a requisição eu utilizei o <b>axios</b> para tornar as coisas um pouco mais fácil  !
          </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <KeyboardArrowRightIcon />
            </ListItemIcon>
            <Typography variant="body1">
              As rotas são controladas da forma mais simples possível, utilizando o poder de renderização do <b>React</b>, ou seja, através de um índex do componente pai o 'App'.
          </Typography>
          </ListItem>
        </Paper>
        <div style={{paddingTop: 20, paddingBottom: 20}}>
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
