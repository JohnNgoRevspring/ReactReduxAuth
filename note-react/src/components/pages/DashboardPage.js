import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allNotesSelector } from "../../reducers/notes";
import AddNoteCtA from "../ctas/AddNoteCtA";
import { fetchNotes } from "../../actions/notes";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchNotes();

  render() {
    const { isConfirmed, notes } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {notes.length === 0 ? <AddNoteCtA /> : <p>You have notes!</p>}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    notes: allNotesSelector(state)
  };
}

export default connect(mapStateToProps, { fetchNotes })(DashboardPage);
