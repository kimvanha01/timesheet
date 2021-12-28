import React, { FC } from "react";
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { useStyles } from './styleCustomeField';
import { useFormContext, Controller } from 'react-hook-form';
interface ITextFieldProps {
    label: string;
    name: string;
}
const DateField: FC<ITextFieldProps> = ({ label, name }) => {
    const {
        control,
    } = useFormContext();
    const classes = useStyles();
    return (
        <Controller
            name={name}
            defaultValue={null}
            control={control}
            render={({ field }) => (
                <DatePicker
                    value={!field.value ? null : field.value}
                    onChange={field.onChange}
                    label={label}
                    inputRef={field.ref}
                    renderInput={(props) => (
                        <TextField
                            size="small"
                            className={classes.inputControl}
                            {...props}
                        />
                    )}
                />
            )}
        />
    );
}

export default DateField;