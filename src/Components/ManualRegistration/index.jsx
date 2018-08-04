import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//! MATERIAL ICONS
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

//! COMPONENTS
import ChipInput from 'material-ui-chip-input'

//!TOOLS
import _ from 'underscore';
import moment from 'moment';

const styles = theme => ({
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
            }
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

    handleDeleteTag = (tag, tagIndex) => {
        const { tags } = this.state.newCandidate;
        const newTagsArr = _.filter(tags, (item, itemIndex) => {
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
        const newArr = _.filter(formations, (p, pIdx) => {
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
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="institution">Instituição</InputLabel>
                            <Input
                                value={formation.institution}
                                name="institution"
                                id="institution"
                                onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="course">Curso</InputLabel>
                            <Input
                                value={formation.course}
                                name="course"
                                id="course"
                                onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Concluido</InputLabel>
                            <Select
                                value={formation.isConcluded}
                                onChange={(e) => this.handleFormationDataChanges(e, idx)}
                                name="isConcluded"
                                id="isConcluded"
                                required>
                                <MenuItem value={true}>Sim</MenuItem>
                                <MenuItem value={false}>Não</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
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
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
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
                            />
                        </FormControl>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleRemoveFormation(idx)}>
                            <DeleteIcon className={classes.leftIcon} />
                            Remover
                        </Button>
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
        const newArr = _.filter(professionalExperiences, (p, pIdx) => {
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
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="companyName">Nome da empresa</InputLabel>
                            <Input
                                value={professionalExperience.companyName}
                                name="companyName"
                                id="companyName"
                                onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="role">Cargo</InputLabel>
                            <Input
                                value={professionalExperience.role}
                                name="role"
                                id="role"
                                onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
                                required
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
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
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
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
                            />
                        </FormControl>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleRemoveProfessionalExperience(idx)}>
                            <DeleteIcon className={classes.leftIcon} />
                            Remover
                        </Button>
                    </div>
                )
            })
        );
    };

    renderMainForm = () => {
        const { classes } = this.props;
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name">Nome</InputLabel>
                    <Input
                        value={this.state.newCandidate.name}
                        name="name"
                        id="name"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="birthDate">Data de nascimento</InputLabel>
                    <Input
                        value={this.state.newCandidate.birthDate}
                        name="birthDate"
                        id="birthDate"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="gender">Gênero</InputLabel>
                    <Input
                        value={this.state.newCandidate.gender}
                        name="gender"
                        id="gender"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <Input
                        value={this.state.newCandidate.email}
                        name="email"
                        id="email"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="phone">Telefone</InputLabel>
                    <Input
                        value={this.state.newCandidate.phone}
                        name="phone"
                        id="phone"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="address">Endereço</InputLabel>
                    <Input
                        value={this.state.newCandidate.address}
                        name="address"
                        id="address"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="latitude">Latitude</InputLabel>
                    <Input
                        value={this.state.newCandidate.latitude}
                        name="latitude"
                        id="latitude"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="longitude">Longitude</InputLabel>
                    <Input
                        value={this.state.newCandidate.longitude}
                        name="longitude"
                        id="longitude"
                        onChange={(e) => this.handleUserInputChange(e)}
                        required
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <ChipInput
                        label="Tags"
                        name="tags"
                        id="tags"
                        helperText="Adicione uma tag pressionando a tecla 'Enter'"
                        value={this.state.newCandidate.tags}
                        onAdd={(tag) => this.handleAddTag(tag)}
                        onDelete={(tag, tagIndex) => this.handleDeleteTag(tag, tagIndex)}
                        required
                    />
                </FormControl>
            </div>
        );
    };

    renderSaveBtn = () => {
        const { classes } = this.props;
        return (
            <div className={classes.container} style={{ paddingTop: 20 }}>
                <Button variant="contained" className={classes.button} type="submit" onClick={() => this.saveCandidate()}>
                    <SaveIcon className={classes.leftIcon} />
                    Salvar Candidato
                </Button>
            </div>
        );
    };


    renderFormScreen = () => {
        const { classes } = this.props;
        return (
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
                <div className={classes.container}>
                    {this.renderMainForm()}
                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleAddProfessionalExperience()}>
                        <AddIcon className={classes.leftIcon} />
                        Adicionar experiência
                    </Button>
                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    {this.renderProfessionalExperiences()}
                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleAddFormation()}>
                        <AddIcon className={classes.leftIcon} />
                        Adicionar formação
                    </Button>
                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    {this.renderFormation()}
                </div>

            </form>
        )
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    {this.renderSaveBtn()}
                </div>
                {this.renderFormScreen()}
                <div className={classes.container}>
                    {this.renderSaveBtn()}
                </div>
            </div>
        );
    };

}

ManualRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManualRegistration);