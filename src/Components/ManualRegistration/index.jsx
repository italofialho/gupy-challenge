import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//! MATERIAL ICONS
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//! COMPONENTS
import ChipInput from 'material-ui-chip-input';
import { theme } from "../../Themes";

//!TOOLS
import _ from 'underscore';
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 4,
        color: theme.palette.text.secondary,
    },
    flexItem: {
        flex: 1
    }
});

class ManualRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newCandidate: {
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
            },
            loadingCoords: false,
            savingNewCandidate: false,
        }

        this.showSnackbar = props.showSnackbar.bind(this);
        this.handleComponentChange = props.handleComponentChange.bind(this);
    };

    validateForm() {
        const { newCandidate } = this.state;
        let emptyFields = 0;
        _.each(newCandidate, (item, key) => {
            if (key !== "isActive" && key !== "professionalExperiences" && key !== "formations" && key !== "tags" && !item) emptyFields++;
        });

        return emptyFields === 0;
    }

    saveCandidate = () => {
        const { newCandidate } = this.state;

        if (!this.validateForm()) return this.showSnackbar("Preencha todos os campos necessarios antes de continuar!");

        firebase
            .database()
            .ref("Candidates")
            .push(newCandidate)
            .then((newCandidateSnapshot) => {
                const newCandidateRef = newCandidateSnapshot.ref;
                const newCandidateId = newCandidateSnapshot.key;
                const randomScore = parseFloat((Math.random() * 10)).toFixed(2);
                newCandidateRef.update({
                    _id: newCandidateId,
                    createdAt: moment().format(),
                    score: randomScore
                }).then(() => {
                    this.showSnackbar("Candidato salvo com sucesso!");
                });
            });

        console.log("saveCandidate:", newCandidate);
    };

    handleNewCandidateDataChange = (name, value) => {
        this.setState(prevState => ({
            newCandidate: {
                ...prevState.newCandidate,
                [name]: value
            }
        }));
    };

    handleUserInputChange = (e) => {
        const { name, value } = e.target;
        this.handleNewCandidateDataChange(name, value);
    };

    handleAddTag = (tag) => {
        let tags = this.state.newCandidate.tags;
        tags.push(tag);
        this.handleNewCandidateDataChange("tags", tags);
    };

    handleDeleteTag = (tagIndex) => {
        const { tags } = this.state.newCandidate;
        const newTagsArr = _.filter(tags, (itemIndex) => {
            return itemIndex !== tagIndex;
        });
        this.handleNewCandidateDataChange("tags", newTagsArr);
    };

    handleAddFormation = () => {
        const defaultObjModel = {
            institution: "",
            course: "",
            isConcluded: true,
            startDate: "",
            endDate: ""
        };
        const { formations } = this.state.newCandidate;
        const newArr = formations.concat([defaultObjModel]);
        this.handleNewCandidateDataChange("formations", newArr);
        this.showSnackbar("Nova formação adicionada!");
    };

    handleRemoveFormation = (idx) => {
        const { formations } = this.state.newCandidate;
        const newArr = _.filter(formations, (formation, fIdx) => {
            return idx !== fIdx;
        });
        this.showSnackbar("Formação removida com sucesso.");
        this.handleNewCandidateDataChange("formations", newArr);
    };

    handleFormationDataChanges = (e, idx) => {
        const { formations } = this.state.newCandidate;
        const { name, value } = e.target;

        const newArr = _.map(formations, (formation, pIdx) => {
            if (idx !== pIdx) return formation;
            return { ...formation, [name]: value };
        });

        this.handleNewCandidateDataChange("formations", newArr);
    };

    renderFormation = () => {
        const { formations } = this.state.newCandidate;
        const { classes } = this.props;
        return (
            _.map(formations, (formation, idx) => {
                return (
                    <div key={idx}>
                        <Paper className={classes.paper}>
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

    handleAddProfessionalExperience = () => {
        const defaultObjModel = {
            companyName: "",
            role: "",
            startDate: "",
            endDate: ""
        };

        const { professionalExperiences } = this.state.newCandidate;
        const newArr = professionalExperiences.concat([defaultObjModel]);
        this.handleNewCandidateDataChange("professionalExperiences", newArr);
        this.showSnackbar("Nova experiência profissional adicionada!");
    };

    handleRemoveProfessionalExperience = (idx) => {
        const { professionalExperiences } = this.state.newCandidate;
        const newArr = _.filter(professionalExperiences, (pe, peIdx) => {
            return idx !== peIdx;
        });
        this.showSnackbar("Experiência profisional removida.");
        this.handleNewCandidateDataChange("professionalExperiences", newArr);
    };

    handleProfessionalExperiencesDataChanges = (e, idx) => {
        const { professionalExperiences } = this.state.newCandidate;
        const { name, value } = e.target;

        const newArr = _.map(professionalExperiences, (professionalExperience, pIdx) => {
            if (idx !== pIdx) return professionalExperience;
            return { ...professionalExperience, [name]: value };
        });
        this.handleNewCandidateDataChange("professionalExperiences", newArr);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log("handleFormSubmit called!");
        this.saveCandidate();
    }

    parseGeocodeResult(result) {
        return new Promise((resolve, reject) => {
            const { location } = result.results[0].geometry;
            this.handleNewCandidateDataChange("latitude", location.lat);
            this.handleNewCandidateDataChange("longitude", location.lng);
            resolve();
        });
    }

    loadCoordByAddress() {
        const { address } = this.state.newCandidate;
        const apiURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=false`
        this.setState({ loadingCoords: true }, () => {
            axios
                .get(apiURL)
                .then((res) => {
                    const result = res.data;
                    this.parseGeocodeResult(result).then(() => {
                        this.setState({ loadingCoords: false });
                    });
                    console.log("result:", result);
                })
                .catch((error) => {
                    console.log("loadCoordByAddress errors:", error);
                })
        });
    };


    renderProfessionalExperiences = () => {
        const { professionalExperiences } = this.state.newCandidate;
        const { classes } = this.props;
        return (
            _.map(professionalExperiences, (professionalExperience, idx) => {
                return (
                    <div key={idx}>
                        <Paper className={classes.paper}>
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

    renderMainForm = () => {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Grid container spacing={8}>
                        <Grid item md={12}>
                            <Typography variant="title">
                                Informações pessoais
                        </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.name}
                                error={!this.state.newCandidate.name}
                                label="Nome"
                                name="name"
                                id="name"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.birthDate}
                                error={!this.state.newCandidate.birthDate}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Data de nascimento"
                                name="birthDate"
                                id="birthDate"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.gender}
                                error={!this.state.newCandidate.gender}
                                label="Gênero"
                                name="gender"
                                id="gender"
                                onChange={(e) => this.handleUserInputChange(e)}
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
                                value={this.state.newCandidate.email}
                                error={!this.state.newCandidate.email}
                                label="E-mail"
                                name="email"
                                id="email"
                                type="email"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.phone}
                                error={!this.state.newCandidate.phone}
                                label="Telefone"
                                name="phone"
                                id="phone"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.address}
                                error={!this.state.newCandidate.address}
                                label="Endereço"
                                name="address"
                                id="address"
                                onChange={(e) => this.handleUserInputChange(e)}
                                onBlur={() => this.loadCoordByAddress()}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.latitude}
                                error={!this.state.newCandidate.latitude}
                                disabled={this.state.loadingCoords}
                                label="Latitude"
                                name="latitude"
                                id="latitude"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.longitude}
                                error={!this.state.newCandidate.longitude}
                                disabled={this.state.loadingCoords}
                                label="Longitude"
                                name="longitude"
                                id="longitude"
                                onChange={(e) => this.handleUserInputChange(e)}
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
                                value={this.state.newCandidate.tags}
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

    renderSaveBtn = () => {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" className={classes.button} onClick={() => this.handleComponentChange(2)}>
                    <ArrowBackIcon className={classes.leftIcon} />
                    Voltar para a lista
                </Button>
                <Button variant="contained" className={classes.button} onClick={() => this.saveCandidate()}>
                    <SaveIcon className={classes.leftIcon} />
                    Salvar Candidato
                </Button>
            </div>
        );
    };


    renderFormScreen = () => {
        const { classes } = this.props;
        const { savingNewCandidate } = this.state;
        return (
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
                <Grid container spacing={8}>
                    <Grid item md={12}>
                        {this.renderMainForm()}
                    </Grid>
                    <Grid item md={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => this.handleAddProfessionalExperience()}
                            disabled={savingNewCandidate}>
                            <AddIcon className={classes.leftIcon} />
                            Adicionar experiência
                    </Button>
                    </Grid>
                    <Grid item md={12}>
                        {this.renderProfessionalExperiences()}
                    </Grid>
                    <Grid item md={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => this.handleAddFormation()}
                            disabled={savingNewCandidate}>
                            <AddIcon className={classes.leftIcon} />
                            Adicionar formação
                    </Button>
                    </Grid>
                    <Grid item md={12}>
                        {this.renderFormation()}
                    </Grid>
                </Grid>
            </form>
        )
    };


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item md={12}>
                        {this.renderSaveBtn()}
                        {this.renderPreviewCandidate()}
                    </Grid>
                    <Grid item md={12}>
                        {this.renderFormScreen()}
                    </Grid>
                    <Grid item md={12}>
                        {this.renderSaveBtn()}
                    </Grid>
                </Grid>
            </div>
        );
    };

}

ManualRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManualRegistration);