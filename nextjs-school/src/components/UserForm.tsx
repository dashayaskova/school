import React, { useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import { ClassType, ParamsType } from '@/generated/graphql';
import AddClassDialog from './AddClassDialog';
import { FullUser } from '@/utils/userReq';

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
  },
  alert: {
    width: '50%'
  }
}));

type UserFormType = {
  classes: ClassType[],
  params: ParamsType,
  user: FullUser,
  onFormSubmit: (user: FullUser, onSuccess: () => void, onError: () => void) => void
};

const UserForm: FunctionComponent<UserFormType> = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState(props.user);
  const [openError, setOpenError] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setUser({ ...user, classAccess: user.classAccess.filter(el => el.class.id != id) });
  };

  const handleFormSubmit = () => {
    props.onFormSubmit({...user, ...(user.isAdmin && {classAccess: [] }) },
      () => { window.location.pathname = '/users' },
      () => { setOpenError(true) });
  };

  const listItems = user.classAccess.map((classObj) =>
    <ListItem key={classObj.class.id}>
      <ListItemText
        primary={classObj.class.name}
        secondary={classObj.class.year}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => handleDeleteItem(classObj.class.id)} edge="end" aria-label="delete">
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
            value={user.name}
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
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            id="email"
            disabled={Boolean(user.id)}
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
                value={user.password}
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
              onChange={(e) =>
                setUser({ ...user, isAdmin: e.target.checked })
              }
            ></Checkbox>}
            label={"Адміністратор"}
          />
        </div>
        <Button
          onClick={handleFormSubmit}
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Зберегти
            </Button>
        <Collapse in={openError}>
          <Alert severity="error"
            className={classes.alert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Сталась помилка
                </Alert>
        </Collapse>
      </div>
      {
        !user.isAdmin &&
        <div className="half">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={handleClickOpen}
          >
            Додати класи
          </Button>
          <AddClassDialog
            open={open}
            onClose={() => setOpen(false)}
            allClasses={props.classes}
            userClasses={user.classAccess}
            params={props.params}
            setSelectedClasses={(selClass, selSubjects) => {
              let u = {
                ...user,
                classAccess: [...user.classAccess, {
                  class: selClass,
                  subjectAccess: selSubjects
                }]
              };
              setUser(u);
            }}
          />
          <div className={classes.fieldContainer}>
            <List dense>
              {listItems}
            </List>
          </div>
        </div>
      }
    </form>
  )
}

export default UserForm;
