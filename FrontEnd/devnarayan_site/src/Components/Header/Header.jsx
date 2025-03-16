// Header.js
import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

export default function Header(props) {
    const { pageTitle, breadcrumbs } = props;

    return (
        <div>
            <div className="jumbotron jumbotron-fluid page-header">
                <div className="container text-center py-5">
                    <h1 className="text-white display-3 mt-lg-5">{pageTitle}</h1>
                    {breadcrumbs && (
                        <div className="d-inline-flex align-items-center text-white">
                            {breadcrumbs.map((breadcrumb, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <i className="fa fa-circle px-3"></i>}
                                    <p className="m-0">{breadcrumb}</p>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.arrayOf(PropTypes.string),
};
