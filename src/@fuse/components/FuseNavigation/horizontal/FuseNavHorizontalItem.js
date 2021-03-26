import { Icon, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import * as Actions from 'owp/store/actions';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FuseNavBadge from './../FuseNavBadge';

const propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        icon: PropTypes.string,
        url: PropTypes.string,
    }),
};

const defaultProps = {};

const styles = (theme) => ({
    root: {
        minHeight: 48,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-text-primary': {
                color: 'inherit',
            },
            '& .list-item-icon': {
                color: 'inherit',
            },
        },
        '& .list-item-icon': {},
        '& .list-item-text': {},
        color: 'inherit!important',
        textDecoration: 'none!important',
    },
});

function FuseNavHorizontalItem({ item, classes, nestedLevel, userRole, navbarCloseMobile }) {
    if (
        item.auth &&
        (!item.auth.includes(userRole) ||
            (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))
    ) {
        return null;
    }

    return (
        <ListItem
            button
            component={NavLink}
            to={item.url}
            activeClassName="active"
            className={classNames(classes.root)}
            onClick={navbarCloseMobile}
            exact={item.exact}
        >
            {!item.iconUrl && item.icon && (
                <Icon className="list-item-icon text-16 flex-no-shrink" color="action">
                    {item.icon}
                </Icon>
            )}
            {item.iconUrl && (
                <img
                    src={item.iconUrl}
                    alt=""
                    style={{ color: '#0000008A', width: 16, height: 16 }}
                    className="list-item-icon text-16 flex-no-shrink"
                />
            )}
            <ListItemText
                className="list-item-text pr-0"
                primary={item.title}
                classes={{ primary: 'text-14 list-item-text-primary' }}
            />
            {item.badge && <FuseNavBadge className="ml-8" badge={item.badge} />}
        </ListItem>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            navbarCloseMobile: Actions.navbarCloseMobile,
        },
        dispatch
    );
}

function mapStateToProps({ auth, fuse }) {
    return {
        userRole: auth.user.role,
    };
}

FuseNavHorizontalItem.propTypes = propTypes;
FuseNavHorizontalItem.defaultProps = defaultProps;

const NavHorizontalItem = withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseNavHorizontalItem))
);

export default NavHorizontalItem;
