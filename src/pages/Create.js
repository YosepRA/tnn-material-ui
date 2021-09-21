import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  field: {
    margin: '20px 0',
    display: 'block',
  },
});

export default function Create() {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('money');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title === '') setTitleError(true);
    if (details === '') setDetailsError(true);

    if (title && details) {
      const values = { title, details, category };

      await fetch(`${process.env.REACT_APP_API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      history.push('/');
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Note Title"
          className={classes.field}
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          onChange={(event) => setTitle(event.target.value)}
        />

        <TextField
          id="details"
          label="Details"
          className={classes.field}
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          onChange={(event) => setDetails(event.target.value)}
        />

        <FormControl className={classes.field}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <FormControlLabel label="Money" value="money" control={<Radio />} />
            <FormControlLabel label="Todos" value="todos" control={<Radio />} />
            <FormControlLabel
              label="Reminders"
              value="reminders"
              control={<Radio />}
            />
            <FormControlLabel label="Work" value="work" control={<Radio />} />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
