import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddNoteCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new note</Card.Header>
      <Link to="/notes/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddNoteCtA;
