import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { red, blue, yellow, green } from '@material-ui/core/colors';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      switch (note.category) {
        case 'money':
          return green[500];

        case 'todos':
          return yellow[500];

        case 'reminders':
          return blue[500];

        default:
          return red[500];
      }
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);

  return (
    <Card elevation={2}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>{note.category[0]}</Avatar>}
        action={
          <IconButton onClick={() => handleDelete(note.id)}>
            <DeleteOutline />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}
