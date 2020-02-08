import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import {
  // AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg';
// import sygnet from '../../assets/img/brand/sygnet.svg';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout() {
    window.localStorage.removeItem('jwt');
    window.location.href = '#/login';
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          // full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          // minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          {/* <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">Головна</NavLink>
          </NavItem> */}
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/default-avatar.jpg'} className="img-avatar" alt="default"/>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem> */}
              <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Вихід</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none"/>*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
