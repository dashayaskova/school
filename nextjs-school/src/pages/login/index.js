import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
} from '@material-ui/core';

import { getClasses, signIn } from '../../actions';

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
                        onClick={e => signIn(email, password, () => window.location.reload())}
                        className={classes.button}
                    >
                        Login
              </Button>
                </form>
            </main>
        </div>
    );
};

export default Login;
