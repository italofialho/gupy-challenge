import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class ViewRecorded extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <span>ViewRecorded</span>
            </div>
        );
    };

}

ViewRecorded.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewRecorded);