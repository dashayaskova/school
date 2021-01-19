import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import {
    Dialog,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles({
    paper: { padding: "40px" },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
});

const AddClassDialog = (props) => {
    const classes = useStyles();
    const { onClose, params, setSelectedClasses, allClasses, userClasses } = props;
    const [currentYear, setCurrentYear] = useState(params.currentYear);
    const [currentClass, setCurrentClass] = useState();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [checked, setChecked] = useState(true);

    const filteredClasses = allClasses
        .filter(el => el.year === currentYear)
        .filter(e1 => !userClasses.map(e2 => e2.class.id).includes(e1.id));

    const handleClose = () => {
        if (currentClass) {
            setSelectedClasses(currentClass, selectedSubjects);
        }

        onClose();
    }

    const subjectsList = currentClass?.subjects?.map((sub) =>
    (
        <FormControlLabel key={sub.id}
            disabled={checked}
            control={<Checkbox
                onChange={(event) => {
                    var newValue = event.target.checked ? [...selectedSubjects, sub] :
                        selectedSubjects.filter(el => el.id != sub.id);
                    setSelectedSubjects(newValue);
                }} />}
            label={sub.name}
        />
    ));

    return (
        <Dialog classes={{ paper: classes.paper }} onClose={() => onClose()} open={props.open}>
            <div className={classes.row}>
                <FormControl style={{ marginRight: '20px' }} variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Рік"
                        value={currentYear}
                        onChange={(event) => setCurrentYear(event.target.value)}
                    >
                        {params.years.map((el) => (<MenuItem key={el} value={el}>{el}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Клас</InputLabel>
                    <Select style={{ width: '100px' }} 
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Клас"
                        value={currentClass || ""}
                        onChange={(event) => setCurrentClass(event.target.value)}
                    >
                        <MenuItem value="">-</MenuItem>
                        {filteredClasses.map((el) => (<MenuItem key={el.id} value={el}>{el.name}</MenuItem>))}
                    </Select>
                </FormControl>
            </div>
            { currentClass ?
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => { setChecked(event.target.checked); }}
                                color="primary"
                            />
                        }
                        label="Усі предмети"
                    />
                    { subjectsList}
                </> : <></>}
            <Button disabled={!currentClass} autoFocus onClick={handleClose} color="secondary">
                Save changes
                </Button>
        </Dialog>
    );
}

export default AddClassDialog;
