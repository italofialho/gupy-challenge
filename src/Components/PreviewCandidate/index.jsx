import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//! MATERIAL COMPONENTS
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

//! MATERIAL ICONS
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

//! COMPONENTS
import ChipInput from "material-ui-chip-input";
import { theme } from "../../Themes";

//! TOOLS
import moment from "moment";
import _ from "lodash";
import firebase from "firebase";
import axios from "axios";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    flex: {
        flex: 1
    },
    formControl: {
        margin: theme.spacing.unit
    },
    root: {
        flexGrow: 1
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PreviewCandidate extends React.Component {
    constructor(props) {
        super(props);

        this.defaultCandidate = {
            isActive: true,
            picture: "http://placehold.it/32x32",
            birthDate: "",
            name: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            latitude: "",
            longitude: "",
            tags: [],
            professionalExperiences: [],
            formations: []
        };

        this.state = {
            open: props.open == "true" ? true : false,
            candidateRecived: false,
            candidate: {
                ...this.defaultCandidate,
                ...props.candidate
            },
            snackbarMessage: "",
            showSnackbar: false,
            updatingCandidate: false,
        };

        this.togglePreview = props.togglePreview.bind(this);
        this.refreshCandidatesList = props.refreshCandidatesList.bind(this);
    }

    componentWillReceiveProps = nextProps => {
        console.log(
            "componentWillReceiveProps PreviewCandidate nextProps:",
            nextProps
        );
        if (nextProps.candidate) {
            if (
                this.state.candidate &&
                nextProps.candidate._id !== this.state.candidate._id
            ) {
                if (nextProps.candidate && nextProps.candidate.name) {
                    this.showSnackbar(
                        `Editando o candidato '${nextProps.candidate.name}'`
                    );
                }
                this.setState({
                    candidateRecived: true,
                    candidate: {
                        ...this.defaultCandidate,
                        ...nextProps.candidate
                    }
                });
            }
        }

        this.setState({ open: !!nextProps.open });
    };

    handleClickOpen = () => {
        this.togglePreview(true);
    };

    handleClose = () => {
        this.togglePreview(false);
    };

    handleUserInputChange = e => {
        const { name, value } = e.target;
        this.handleCandidateDataChange(name, value);
    };

    handleCandidateDataChange = (name, value) => {
        this.setState(prevState => ({
            candidate: {
                ...prevState.candidate,
                [name]: value
            }
        }));
    };

    handleAddTag = tag => {
        let tags = this.state.candidate.tags;
        tags.push(tag);
        this.handleCandidateDataChange("tags", tags);
    };

    handleDeleteTag = tagIndex => {
        const { tags } = this.state.candidate;
        const newTagsArr = _.filter(tags, itemIndex => {
            return itemIndex !== tagIndex;
        });
        this.handleCandidateDataChange("tags", newTagsArr);
    };

    handleAddProfessionalExperience = () => {
        const defaultObjModel = {
            companyName: "",
            role: "",
            startDate: "",
            endDate: ""
        };

        const { professionalExperiences } = this.state.candidate;
        const newArr = professionalExperiences.concat([defaultObjModel]);
        this.handleCandidateDataChange("professionalExperiences", newArr);
        this.showSnackbar("Nova experiência profissional adicionada!");
    };

    handleRemoveProfessionalExperience = idx => {
        const { professionalExperiences } = this.state.candidate;
        const newArr = _.filter(professionalExperiences, (pe, peIdx) => {
            return idx !== peIdx;
        });
        this.showSnackbar("Experiência profisional removida.");
        this.handleCandidateDataChange("professionalExperiences", newArr);
    };

    handleProfessionalExperiencesDataChanges = (e, idx) => {
        const { professionalExperiences } = this.state.candidate;
        const { name, value } = e.target;

        const newArr = _.map(
            professionalExperiences,
            (professionalExperience, pIdx) => {
                if (idx !== pIdx) return professionalExperience;
                return { ...professionalExperience, [name]: value };
            }
        );
        this.handleCandidateDataChange("professionalExperiences", newArr);
    };

    handleAddFormation = () => {
        const defaultObjModel = {
            institution: "",
            course: "",
            isConcluded: true,
            startDate: "",
            endDate: ""
        };
        const { formations } = this.state.candidate;
        const newArr = formations.concat([defaultObjModel]);
        this.handleCandidateDataChange("formations", newArr);
        this.showSnackbar("Nova formação adicionada!");
    };

    handleRemoveFormation = idx => {
        const { formations } = this.state.candidate;
        const newArr = _.filter(formations, (formation, fIdx) => {
            return idx !== fIdx;
        });
        this.showSnackbar("Formação removida com sucesso.");
        this.handleCandidateDataChange("formations", newArr);
    };

    handleFormationDataChanges = (e, idx) => {
        const { formations } = this.state.candidate;
        const { name, value } = e.target;

        const newArr = _.map(formations, (formation, pIdx) => {
            if (idx !== pIdx) return formation;
            return { ...formation, [name]: value };
        });

        this.handleCandidateDataChange("formations", newArr);
    };

    updateCandidate = () => {
        const { candidate, updatingCandidate } = this.state;

        if(updatingCandidate){
            this.showSnackbar("Aguarde o termino da atualização anterior!");
            return;
        }

        if (candidate._id) {
            this.setState({ updatingCandidate: true }, () => {
                const apiEndPoint = " https://us-central1-gupy-challenge.cloudfunctions.net/updateCandidate";
                const parameters = {
                    candidate
                };
                const requestConfig = {
                    crossDomain: true
                };
                axios
                    .post(apiEndPoint, parameters, requestConfig)
                    .then(() => {
                        this.setState({ updatingCandidate: false });
                        this.refreshCandidatesList();
                        this.showSnackbar("Candidato atualizado com sucesso!");
                        this.handleClose();
                    })
                    .catch(error => {
                        this.setState({ updatingCandidate: false });
                        console.log("updateCandidate error:", error);
                    });
            });
        }
    };

    renderMainForm = () => {
        const { classes } = this.props;
        const { candidate } = this.state;
        return (
            <div style={{ padding: 20 }}>
                <Paper className={classes.paper} style={{ padding: 20 }}>
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Typography variant="title">Informações pessoais</Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={candidate.name}
                                error={!candidate.name}
                                label="Nome"
                                name="name"
                                id="name"
                                onChange={e => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                className={classes.formControl}
                                value={moment(candidate.birthDate.split(" ")[0]).format(
                                    "YYYY-MM-DD"
                                )}
                                error={!candidate.birthDate}
                                type="date"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                label="Data de nascimento"
                                name="birthDate"
                                id="birthDate"
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onChange={e => this.handleUserInputChange(e)}
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
                                onAdd={tag => this.handleAddTag(tag)}
                                onDelete={(tag, tagIndex) =>
                                    this.handleDeleteTag(tag, tagIndex)
                                }
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
        return _.map(formations, (formation, idx) => {
            return (
                <div key={idx} style={{ padding: 20 }}>
                    <Paper className={classes.paper} style={{ padding: 20 }}>
                        <Grid container spacing={8}>
                            <Grid item md={10}>
                                <Typography variant="title">Nova Formação</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Button
                                    variant="contained"
                                    style={theme.palette.danger}
                                    className={classes.button}
                                    onClick={() => this.handleRemoveFormation(idx)}
                                >
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
                                    onChange={e => this.handleFormationDataChanges(e, idx)}
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
                                    onChange={e => this.handleFormationDataChanges(e, idx)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    className={classes.formControl}
                                    value={formation.isConcluded}
                                    select
                                    label="Concluido"
                                    onChange={e => this.handleFormationDataChanges(e, idx)}
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
                                        shrink: true
                                    }}
                                    value={moment(formation.startDate.split(" ")[0]).format(
                                        "YYYY-MM-DD"
                                    )}
                                    onChange={e => this.handleFormationDataChanges(e, idx)}
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
                                        shrink: true
                                    }}
                                    value={moment(formation.endDate.split(" ")[0]).format(
                                        "YYYY-MM-DD"
                                    )}
                                    onChange={e => this.handleFormationDataChanges(e, idx)}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            );
        });
    };

    renderProfessionalExperiences = () => {
        const { professionalExperiences } = this.state.candidate;
        const { classes } = this.props;
        return _.map(professionalExperiences, (professionalExperience, idx) => {
            return (
                <div key={idx} style={{ padding: 20 }}>
                    <Paper className={classes.paper} style={{ padding: 20 }}>
                        <Grid container spacing={8}>
                            <Grid item md={10}>
                                <Typography variant="title">
                                    Nova Experiência Profissional
                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Button
                                    variant="contained"
                                    style={theme.palette.danger}
                                    className={classes.button}
                                    onClick={() => this.handleRemoveProfessionalExperience(idx)}
                                >
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
                                    onChange={e =>
                                        this.handleProfessionalExperiencesDataChanges(e, idx)
                                    }
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
                                    onChange={e =>
                                        this.handleProfessionalExperiencesDataChanges(e, idx)
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    className={classes.formControl}
                                    id="startDate"
                                    name="startDate"
                                    label="Data de entrada"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={moment(
                                        professionalExperience.startDate.split(" ")[0]
                                    ).format("YYYY-MM-DD")}
                                    onChange={e =>
                                        this.handleProfessionalExperiencesDataChanges(e, idx)
                                    }
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
                                        shrink: true
                                    }}
                                    value={moment(
                                        professionalExperience.endDate.split(" ")[0]
                                    ).format("YYYY-MM-DD")}
                                    onChange={e =>
                                        this.handleProfessionalExperiencesDataChanges(e, idx)
                                    }
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            );
        });
    };

    renderSnackbar = () => {
        const { snackbarMessage, showSnackbar } = this.state;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={(e, r) => this.hideSnackbar(e, r)}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={<span id="message-id">{snackbarMessage}</span>}
                action={[
                    <Button
                        key="undo"
                        color="secondary"
                        size="small"
                        onClick={(e, r) => this.hideSnackbar(e, r)}
                    >
                        OK
          </Button>
                ]}
            />
        );
    };

    showSnackbar = snackbarMessage => {
        this.setState({
            showSnackbar: true,
            snackbarMessage
        });
    };

    hideSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ showSnackbar: false });
    };

    render() {
        const { classes } = this.props;
        const { candidate, savingNewCandidate } = this.state;

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
                            <IconButton
                                color="inherit"
                                onClick={() => this.handleClose()}
                                aria-label="Close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography
                                variant="title"
                                color="inherit"
                                className={classes.flex}
                            >
                                {candidate.name}
                            </Typography>
                            <Button color="inherit" onClick={() => this.updateCandidate()}>
                                {this.state.updatingCandidate ? "Atualizando..." : "Atualizar Candidato"}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {this.renderSnackbar()}
                    <Grid container spacing={24} className={classes.root}>
                        <Grid item md={12}>
                            {this.renderMainForm()}
                        </Grid>
                        <Grid item md={12}>
                            <div style={{ paddingLeft: 20 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => this.handleAddProfessionalExperience()}
                                    disabled={savingNewCandidate}
                                >
                                    <AddIcon className={classes.leftIcon} />
                                    Adicionar experiência
                </Button>
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            {this.renderProfessionalExperiences()}
                        </Grid>
                        <Grid item md={12}>
                            <div style={{ paddingLeft: 20 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => this.handleAddFormation()}
                                    disabled={savingNewCandidate}
                                >
                                    <AddIcon className={classes.leftIcon} />
                                    Adicionar formação
                </Button>
                            </div>
                        </Grid>
                        <Grid item md={12}>
                            {this.renderFormation()}
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        );
    }
}

PreviewCandidate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PreviewCandidate);
