import React, { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useStyles } from './styleCustomeField';
interface ITextFieldProps {
    label: string;
    name: string;
    type?: string;
    required?: boolean
}

const InputField: FC<ITextFieldProps> = ({ label, name, type, required }: ITextFieldProps) => {
    const {
        formState: { errors },
        control,
    } = useFormContext();
    const classes = useStyles();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <TextField
                    className={classes.inputControl}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    {...field}
                    label={label}
                    type={type}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors[name]}
                    required={required}
                />
            )}

        />

    );
};

export default InputField;