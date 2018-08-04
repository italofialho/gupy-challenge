import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//! MATERIAL ICONS
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

//! COMPONENTS
import ChipInput from 'material-ui-chip-input'

//!TOOLS
import _ from 'underscore';

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
    }
});

class ManualRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newCandidate: {
                "isActive": false,
                "picture": "",
                "birthDate": "",
                "name": "",
                "gender": "",
                "email": "",
                "phone": "",
                "address": "",
                "createdAt": "",
                "latitude": "",
                "longitude": "",
                "tags": [],
                "professionalExperiences": [],
                "formations": []
            },
            savingNewCandidate: false,
        }
    };

    saveCandidate = () => {
        const { newCandidate } = this.state;
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
    };

    handleRemoveFormation = (idx) => {
        const { formations } = this.state.newCandidate;
        const newArr = _.filter(formations, (pIdx) => {
            return idx !== pIdx;
        });
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
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.institution}
                                        name="institution"
                                        id="institution"
                                        label="Instituição"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.course}
                                        name="course"
                                        id="course"
                                        label="Curso"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        className={classes.formControl}
                                        value={formation.isConcluded}
                                        select
                                        label="Concluido"
                                        onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                        name="isConcluded"
                                        id="isConcluded"
                                        required
                                        fullWidth
                                    >
                                        <MenuItem value={true}>Sim</MenuItem>
                                        <MenuItem value={false}>Não</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
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
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleRemoveFormation(idx)}>
                                        <DeleteIcon className={classes.leftIcon} />
                                        Remover
                                </Button>
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
    };

    handleRemoveProfessionalExperience = (idx) => {
        const { professionalExperiences } = this.state.newCandidate;
        const newArr = _.filter(professionalExperiences, (pIdx) => {
            return idx !== pIdx;
        });
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
        this.saveCandidate();
    }


    renderProfessionalExperiences = () => {
        const { professionalExperiences } = this.state.newCandidate;
        const { classes } = this.props;
        return (
            _.map(professionalExperiences, (professionalExperience, idx) => {
                return (
                    <div key={idx}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={8}>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={professionalExperience.companyName}
                                        label="Nome da empresa"
                                        name="companyName"
                                        id="companyName"
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className={classes.formControl}
                                        value={professionalExperience.role}
                                        label="Cargo"
                                        name="role"
                                        id="role"
                                        onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleRemoveProfessionalExperience(idx)}>
                                        <DeleteIcon className={classes.leftIcon} />
                                        Remover
                                    </Button>
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
                        <Grid item xs={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.name}
                                label="Nome"
                                name="name"
                                id="name"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.birthDate}
                                label="Data de nascimento"
                                name="birthDate"
                                id="birthDate"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.gender}
                                label="Gênero"
                                name="gender"
                                id="gender"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.email}
                                label="E-mail"
                                name="email"
                                id="email"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.phone}
                                label="Telefone"
                                name="phone"
                                id="phone"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.address}
                                label="Endereço"
                                name="address"
                                id="address"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.latitude}
                                label="Latitude"
                                name="latitude"
                                id="latitude"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                className={classes.formControl}
                                value={this.state.newCandidate.longitude}
                                label="Longitude"
                                name="longitude"
                                id="longitude"
                                onChange={(e) => this.handleUserInputChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ChipInput
                                className={classes.formControl}
                                label="Tags"
                                name="tags"
                                id="tags"
                                value={this.state.newCandidate.tags}
                                onAdd={(tag) => this.handleAddTag(tag)}
                                onDelete={(tag, tagIndex) => this.handleDeleteTag(tag, tagIndex)}
                                required
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
            <Button variant="contained" className={classes.button} type="submit" onClick={() => this.saveCandidate()}>
                <SaveIcon className={classes.leftIcon} />
                Salvar Candidato
            </Button>
        );
    };


    renderFormScreen = () => {
        const { classes } = this.props;
        const { savingNewCandidate } = this.state;
        return (
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        {this.renderMainForm()}
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        {this.renderProfessionalExperiences()}
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        {this.renderSaveBtn()}
                    </Grid>
                    <Grid item xs={12}>
                        {this.renderFormScreen()}
                    </Grid>
                    <Grid item xs={12}>
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