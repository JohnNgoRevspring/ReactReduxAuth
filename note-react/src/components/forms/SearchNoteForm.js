import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";

class SearchNoteForm extends React.Component {
  state = {
    query: "",
    loading: false,
    options: [],
    notes: {}
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onNoteSelect(this.state.notes[data.value]);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get(`/api/notes/search?q=${this.state.query}`)
      .then(res => res.data.notes)
      .then(notes => {
        const options = [];
        const notesHash = {};
        notes.forEach(note => {
          notesHash[note.goodreadsId] = note;
          options.push({
            key: note.goodreadsId,
            value: note.goodreadsId,
            text: note.title
          });
        });
        this.setState({ loading: false, options, notes: notesHash });
      });
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a note by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchNoteForm.propTypes = {
  onNoteSelect: PropTypes.func.isRequired
};

export default SearchNoteForm;
