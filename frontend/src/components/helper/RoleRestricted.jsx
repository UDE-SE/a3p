import {connect} from 'react-redux'


const mapStateToProps = state => ({currentRoles: state.user.roles});

function _RoleRestricted(props) {
    if (props.currentRoles.includes(props.role)) {
        return props.children;
    }
    return null;
}

const RoleRestricted = connect(mapStateToProps)(_RoleRestricted);

export default RoleRestricted;
