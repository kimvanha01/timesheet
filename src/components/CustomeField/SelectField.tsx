import { FormControl, Select, InputLabel } from '@mui/material';
import React, { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useStyles } from './styleCustomeField';
interface ITextFieldProps {
    label?: string;
    name: string;
    type?: string;
    listItem: Array<JSX.Element>;
    required?: boolean
}

const SelectField: FC<ITextFieldProps> = ({ label, name, type, listItem, required }: ITextFieldProps) => {
    const {
        formState: { errors }, control,
    } = useFormContext();
    const classes = useStyles();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <FormControl
                    className={classes.inputControl}
                    fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        size="small"
                        margin="dense"
                        label={label}
                        {...field}
                        error={!!errors[name]}
                        required={required}
                    >
                        {/* <MenuItem value={0}> Choose a {label}</MenuItem> */}
                        {listItem}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default SelectField;