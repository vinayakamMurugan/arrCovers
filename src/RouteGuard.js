import React from 'react';
import {Redirect,Route} from 'react-router-dom';
import PropTypes from 'prop-types';
export default function RouteWrappers({
    component:Component,
    isPrivate,
    ...rest
}) {
    // how to change it programmtically ans is redux
       
        const isLogin = sessionStorage.getItem('isLogin');
        
       if (isPrivate && !JSON.parse(isLogin)) {
           
           return <Redirect to="/login" />;
       }
       if (!isPrivate && JSON.parse(isLogin)) {
        return <Route  {...rest} component={Component} />
       }
       return <Route  {...rest} component={Component} />
}

RouteWrappers.propTypes ={
    isPrivate:PropTypes.bool,
    component:PropTypes.oneOfType([PropTypes.element,PropTypes.func]).isRequired
}

RouteWrappers.defaultProps={
    isPrivate:false
}