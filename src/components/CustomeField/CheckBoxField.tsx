import React, { FC } from 'react';
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
interface ITextFieldProps {
    label?: string;
    name: string;
}
const CheckBoxField: FC<ITextFieldProps> = ({ label, name }: ITextFieldProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            defaultValue={false}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    {...field}
                    control={
                        <Checkbox size="small" checked={field.value} color="primary" />
                    }
                    label={label}
                />
            )}
        />
    );
}

export default CheckBoxField;