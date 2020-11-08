import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import { getClasses } from '../../src/actions/index'
import AddClassDialog from './AddClassDialog'

const useStyles = makeStyles((theme) => ({
  half: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  fieldContainer: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  submit: {
    marginLeft: 'auto',
  },
  checkbox: {
    marginLeft: '10px'
  }
}));

const UserForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [classesObj, setClasses] = React.useState([]);
  const [user, setUser] = useState(props.user);

  const handleClickOpen = async () => {
    setOpen(true);
    setClasses(await getClasses());
  };

  const handleDeleteItem = (id) => {
    setUser({ ...user, classAccess: user.classAccess.filter(el => el.id != id) });
  }

  const listItems = user.classAccess.map((classObj) =>
    <ListItem key={classObj.id}>
      <ListItemText
        primary={classObj.name}
        secondary={'Secondary text'}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => handleDeleteItem(classObj.id)} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>);

  return (
        <form className={classes.form} noValidate>
          <div className={classes.half}>
            <div className={classes.fieldContainer}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                value={user.name || ''}
                onChange={e => setUser({ ...user, name: e.target.value })}
                id="firstName"
                label="ПІБ"
                autoFocus
              />
            </div>
            <div className={classes.fieldContainer}>
              <TextField
                variant="outlined"
                fullWidth
                required
                value={user.email || ''}
                onChange={e => setUser({ ...user, email: e.target.value })}
                id="email"
                disabled={user.id}
                label="Email Address"
                name="email"
              />
            </div>

            <div className={classes.fieldContainer}>
              {
                user.id ?
                  <></> :
                  <TextField
                    variant="outlined"
                    required
                    value={user.password || ''}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
              }

              <FormControlLabel className={classes.checkbox}
                control={<Checkbox
                  checked={user.isAdmin}
                  onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })}
                ></Checkbox>}
                label={"Адміністратор"}
              />
            </div>
            <Button
              onClick={() => props.onFormSubmit(user)}
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Зберегти
                </Button>
          </div>
          <div className="half">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.addClass}
              startIcon={<AddCircleIcon />}
              onClick={handleClickOpen}
            >
              Добавить классы
                </Button>
            <AddClassDialog
              selectedClasses={user.classAccess}
              open={open}
              onClose={() => setOpen(false)}
              classesObj={classesObj}
              setSelectedClasses={(classAccess) => setUser({...user, classAccess})}
            />
            <div className={classes.fieldContainer}>
              <List dense>
                {listItems}
              </List>
            </div>
          </div>
        </form>
  )
}

export default UserForm;
