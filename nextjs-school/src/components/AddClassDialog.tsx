import React, { useEffect, useState, FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import {
    Dialog,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { ParamsType, ClassType, ClassSubjectsType, SubjectType } from '@/generated/graphql';

const useStyles = makeStyles({
    paper: { padding: "40px" },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
});

type AddClassDialogProps = {
  open: boolean,
  onClose: () => void,
  allClasses: ClassType[],
  params: ParamsType,
  userClasses: ClassSubjectsType[],
  setSelectedClasses: (e1: ClassType, e2: SubjectType[]) => void
};

const AddClassDialog: FunctionComponent<AddClassDialogProps> = (props) => {
    const classes = useStyles();
    const { onClose, params, setSelectedClasses, allClasses, userClasses } = props;
    const [currentYear, setCurrentYear] = useState(params.currentYear);
    const [currentClass, setCurrentClass] = useState<undefined | ClassType>();
    const [selectedSubjects, setSelectedSubjects] = useState<SubjectType[]>([]);
    const [checked, setChecked] = useState(true);

    const filteredClasses = allClasses
        .filter(el => el.year === currentYear)
        .filter(e1 => !userClasses.map(e2 => e2.class.id).includes(e1.id));

    useEffect(() => {
        setCurrentClass(filteredClasses[0]);
    }, [currentYear, userClasses]);
    
    const handleClose = () => {
        if (currentClass) {
            setSelectedClasses(currentClass, selectedSubjects);
        }

        onClose();
    }

    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => 
      setCurrentYear(event.target.value as string);

    const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => 
      setCurrentClass(event.target.value as ClassType);

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
                <FormControl style={{ marginRight: '20px' }} variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Рік</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Рік"
                        value={currentYear}
                        onChange={handleYearChange}
                    >
                        {params.years.map((el) => (<MenuItem key={el} value={el}>{el}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Клас</InputLabel>
                    <Select style={{ width: '100px' }} 
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Клас"
                        value={currentClass || ""}
                        onChange={handleClassChange}
                    >
                        <MenuItem value="">-</MenuItem>
                        {filteredClasses.map((el) => (<MenuItem key={el.id} value={el as any}>{el.name}</MenuItem>))}
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
