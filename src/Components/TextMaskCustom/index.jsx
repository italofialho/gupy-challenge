import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

export default class TextMaskCustom extends Component {
    render() {
        const { inputRef, ...other } = this.props;
        return (
            <MaskedInput
                {...other}
                ref={inputRef}
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        )
    }
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
