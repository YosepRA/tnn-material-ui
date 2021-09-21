import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/notes`);
      const data = await res.json();

      setNotes(data);
    };

    getNotes();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/notes/${id}`, {
      method: 'DELETE',
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const noteItems = notes.map((note) => (
    <Grid item xs={12} md={6} lg={4} key={note.id}>
      <NoteCard note={note} handleDelete={handleDelete} />
    </Grid>
  ));

  return (
    <Container>
      <Grid container spacing={3}>
        {noteItems}
      </Grid>
    </Container>
  );
}
