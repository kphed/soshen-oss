import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { link } from '../../../styles/js/reusable/link';

const ReusableLink = React.memo(({
  to,
  children,
}) => <Link to={to} style={link}>{children}</Link>);

ReusableLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReusableLink;
