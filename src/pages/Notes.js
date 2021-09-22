import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';

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

  const breakpoints = {
    default: 3,
    1100: 2,
    800: 1,
  };

  const noteItems = notes.map((note) => (
    <div key={note.id}>
      <NoteCard note={note} handleDelete={handleDelete} />
    </div>
  ));

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {noteItems}
      </Masonry>
    </Container>
  );
}
