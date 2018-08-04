import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

//! MATERIAL ICONS
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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
          if (idx !== pIdx){
              return professionalExperience;
          }

          return { ...professionalExperience, [name]: value };
        });
        
        this.handleNewCandidateDataChange("professionalExperiences", newArr);
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
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="role">Cargo</InputLabel>
                            <Input
                                value={professionalExperience.role}
                                name="role"
                                id="role"
                                onChange={(e) => this.handleProfessionalExperiencesDataChanges(e, idx)}
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
                            />
                        </FormControl>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleRemoveProfessionalExperience(idx)}>
                            <DeleteIcon className={classes.leftIcon} />
                            Remover
                        </Button>
                    </div>
                )
                {/* <div className="shareholder">
                    <input
                        type="text"
                        placeholder={`Shareholder #${idx + 1} name`}
                        value={professionalExperience.name}
                        onChange={() => this.handleShareholderNameChange(idx)}
                    />
                    <button type="button" onClick={() => this.handleRemoveShareholder(idx)} className="small">-</button>
                </div> */}
            })
        );
    };


    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name">Nome</InputLabel>
                        <Input
                            value={this.state.newCandidate.name}
                            name="name"
                            id="name"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="birthDate">Data de nascimento</InputLabel>
                        <Input
                            value={this.state.newCandidate.birthDate}
                            name="birthDate"
                            id="birthDate"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="gender">Gênero</InputLabel>
                        <Input
                            value={this.state.newCandidate.gender}
                            name="gender"
                            id="gender"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <Input
                            value={this.state.newCandidate.email}
                            name="email"
                            id="email"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="phone">Telefone</InputLabel>
                        <Input
                            value={this.state.newCandidate.phone}
                            name="phone"
                            id="phone"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="address">Endereço</InputLabel>
                        <Input
                            value={this.state.newCandidate.address}
                            name="address"
                            id="address"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="latitude">Latitude</InputLabel>
                        <Input
                            value={this.state.newCandidate.latitude}
                            name="latitude"
                            id="latitude"
                            onChange={(e) => this.handleUserInputChange(e)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="longitude">Longitude</InputLabel>
                        <Input
                            value={this.state.newCandidate.longitude}
                            name="longitude"
                            id="longitude"
                            onChange={(e) => this.handleUserInputChange(e)}
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
                        />
                    </FormControl>

                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleAddProfessionalExperience()}>
                        <AddIcon className={classes.leftIcon} />
                        Adicionar experiencia
                    </Button>
                </div>
                <div className={classes.container} style={{ paddingTop: 20 }}>
                    {this.renderProfessionalExperiences()}
                </div>
            </div>
        );
    };

}

ManualRegistration.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManualRegistration);