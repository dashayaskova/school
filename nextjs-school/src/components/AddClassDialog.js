import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    FormLabel,
    FormControl,
    FormControlLabel,
    Checkbox,
 } from '@material-ui/core';

const useStyles = makeStyles({
    paper: { padding: "40px" },
});

const AddClassDialog = (props) => {
    const classes = useStyles();
    const { onClose, selectedClasses, setSelectedClasses } = props;

    const classesList = props.classesObj ? props.classesObj.map((classObj) =>
        (
            <FormControlLabel key={classObj.id}
                control={<Checkbox checked={selectedClasses.filter(e => e.id === classObj.id).length > 0}
                    onChange={(event) => {
                        var newValue = event.target.checked ? [...selectedClasses, classObj] :
                        selectedClasses.filter(el => el.id != classObj.id);
                        setSelectedClasses(newValue);
                    }} />}
                label={classObj.name}
            />
        )) : <></>;

    return (
            <Dialog classes={{ paper: classes.paper}} onClose={() => onClose()} open={props.open}>
                <FormControl  component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Выберите класс</FormLabel>
                    {classesList}
                </FormControl>
            </Dialog>
    );
}

export default AddClassDialog;
