import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Collapse,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { getClasses, signIn } from '@/actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center"
    },
    margin: {
        marginLeft: theme.spacing(1)
    },
    row: {
        display: "flex",
        flexDirection: "column"
    },
    button: {
        margin: theme.spacing(1, 'auto')
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.container}>
            <main>
                <form className={classes.row}>
                    <div>
                        <TextField
                            name="email"
                            variant="outlined"
                            required
                            id="email"
                            label="Email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={classes.margin}
                        />
                        <TextField
                            name="password"
                            type="password"
                            variant="outlined"
                            required
                            id="password"
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={classes.margin}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={e => signIn(email, password, () => window.location.reload(), 
                            (user) => { setOpen(true); })}
                        className={classes.button}
                    >
                        Увійти
              </Button>
              <Collapse in={open}>
                <Alert severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                Неправильно введений пароль!
                </Alert>
            </Collapse>
                </form>
            </main>
        </div>
    );
};

export default Login;
