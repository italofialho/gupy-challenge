import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//! MATERIAL COMPONENTS
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

//! MATERIAL ICONS
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

//! COMPONENTS
import ChipInput from 'material-ui-chip-input';
import { theme } from "../../Themes";

//! TOOLS
import moment from 'moment';
import _ from 'lodash';
import firebase from 'firebase';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PreviewCandidate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            open: props.open == "true" ? true : false,
            candidate: props.candidate
        }

        this.togglePreview = props.togglePreview.bind(this);
        this.refreshCandidatesList = props.refreshCandidatesList.bind(this);
    };

    componentWillReceiveProps = (nextProps) => {
        console.log("componentWillReceiveProps PreviewCandidate nextProps:", nextProps);
        if (nextProps.candidate) {
            this.setState({ candidate: nextProps.candidate });
        }

        this.setState({ open: !!nextProps.open });
    };


    handleClickOpen = () => {
        this.togglePreview(true);
    };

    handleClose = () => {
        this.togglePreview(false);
    };

    updateCandidate = () => {
        const { candidate } = this.state;

        if(candidate._id){
            firebase
            .database()
            .ref(`Candidates/${candidate._id}`)
            .update(candidate)
            .then(() => {
                this.refreshCandidatesList();
                this.showSnackbar("Candidato atualizado com sucesso!");
                this.handleClose();
            });
        }

    };

    renderMainForm = () => {
        const { classes } = this.props;
        const { candidate } = this.state;
        return (
            <div style={{padding: 20}}>
                <Paper className={classes.paper} style={{padding: 20}}>
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Typography variant="title">
                                Informações pessoais
                        </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.name}
                                error={!candidate.name}
                                label="Nome"
                                name="name"
                                id="name"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                className={classes.formControl}
                                value={moment(candidate.birthDate).format("yyyy-MM-dd")}
                                error={!candidate.birthDate}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Data de nascimento"
                                name="birthDate"
                                id="birthDate"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.gender}
                                error={!candidate.gender}
                                label="Gênero"
                                name="gender"
                                id="gender"

                                select
                                required
                                fullWidth
                            >
                                <MenuItem value={"male"}>Homem</MenuItem>
                                <MenuItem value={"female"}>Mulher</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.email}
                                error={!candidate.email}
                                label="E-mail"
                                name="email"
                                id="email"
                                type="email"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.phone}
                                error={!candidate.phone}
                                label="Telefone"
                                name="phone"
                                id="phone"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.address}
                                error={!candidate.address}
                                label="Endereço"
                                name="address"
                                id="address"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.latitude}
                                error={!candidate.latitude}
                                disabled={this.state.loadingCoords}
                                label="Latitude"
                                name="latitude"
                                id="latitude"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.longitude}
                                error={!candidate.longitude}
                                disabled={this.state.loadingCoords}
                                label="Longitude"
                                name="longitude"
                                id="longitude"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={12}>
                            <ChipInput
                                className={classes.formControl}
                                label="Tags"
                                name="tags"
                                id="tags"
                                value={candidate.tags}
                                onAdd={(tag) => this.handleAddTag(tag)}
                                onDelete={(tag, tagIndex) => this.handleDeleteTag(tag, tagIndex)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };

    renderFormation = () => {
        const { formations } = this.state.candidate;
        const { classes } = this.props;
        return (
            _.map(formations, (formation, idx) => {
                return (
                    <div key={idx} style={{padding: 20}}>
                        <Paper className={classes.paper} style={{padding: 20}}>
                            <Grid container spacing={8}>
                                <Grid item md={10}>
                                    <Typography variant="title">
                                        Nova Formação
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Button variant="contained" style={theme.palette.danger} className={classes.button} onClick={() => this.handleRemoveFormation(idx)}>
                                        <DeleteIcon className={classes.leftIcon} />
                                        Remover
                                    </Button>
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.institution}
                                        name="institution"
                                        id="institution"
                                        label="Instituição"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.course}
                                        name="course"
                                        id="course"
                                        label="Curso"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.isConcluded}
                                        select
                                        label="Concluido"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        name="isConcluded"
                                        id="isConcluded"
                                        fullWidth
                                    >
                                        <MenuItem value={true}>Sim</MenuItem>
                                        <MenuItem value={false}>Não</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        id="startDate"
                                        name="startDate"
                                        label="Data de inicio"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formation.startDate}
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        id="endDate"
                                        name="endDate"
                                        label="Data do termino"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={formation.endDate}
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                )
            })
        );
    };

    renderProfessionalExperiences = () => {
        const { professionalExperiences } = this.state.candidate;
        const { classes } = this.props;
        return (
            _.map(professionalExperiences, (professionalExperience, idx) => {
                return (
                    <div key={idx} style={{padding: 20}}>
                        <Paper className={classes.paper} style={{padding: 20}}>
                            <Grid container spacing={8}>
                                <Grid item md={10}>
                                    <Typography variant="title">
                                        Nova Experiência Profissional
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Button variant="contained" style={theme.palette.danger} className={classes.button} onClick={() => this.handleRemoveProfessionalExperience(idx)}>
                                        <DeleteIcon className={classes.leftIcon} />
                                        Remover
                                    </Button>
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={professionalExperience.companyName}
                                        label="Nome da empresa"
                                        name="companyName"
                                        id="companyName"
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={professionalExperience.role}
                                        label="Cargo"
                                        name="role"
                                        id="role"
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        id="startDate"
                                        name="startDate"
                                        label="Data de saida"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={professionalExperience.startDate}
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        className={classes.formControl}
                                        id="endDate"
                                        name="endDate"
                                        label="Data de saida"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={professionalExperience.endDate}
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                )
            })
        );
    };

    render() {
        const { classes } = this.props;
        const { candidate } = this.state;

        if (!candidate) return null;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => this.handleClose()} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {candidate.name}
                            </Typography>
                            <Button color="inherit" onClick={() => this.updateCandidate()}>
                                Atualizar Candidato
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={24} className={classes.root}>
                        <Grid item md={12}>
                            {this.renderMainForm()}
                        </Grid>
                        <Grid item md={12}>
                            {this.renderProfessionalExperiences()}
                        </Grid>
                        <Grid item md={12}>
                            {this.renderFormation()}
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    };
}

PreviewCandidate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewCandidate);