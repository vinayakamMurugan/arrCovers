import React, {Component} from 'react';

import { css } from "@emotion/core";
import LoadingOverlay from 'react-loading-overlay';
import {PropagateLoader} from 'react-spinners'

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

export default class Loading extends Component {

    render() {

        return (

    <LoadingOverlay
    active={this.props.overlayNeeded}
    spinner ={<PropagateLoader
        css={override}
        size={25}
        color={"#034EA2"}
        loading={this.props.overlayNeeded}
      />}                       />
        )}
}
