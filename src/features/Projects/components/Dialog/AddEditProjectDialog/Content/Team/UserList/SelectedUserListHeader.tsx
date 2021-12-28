import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useStyles } from "../TeamTabStyle";
interface Props {
    isChecked: boolean
    handleChangeCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const SelectedUserListHeader = ({ isChecked, handleChangeCheckBox }: Props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.teamTabHeader}>
            <Grid item xs={9} className={classes.selectedHeader} >
                <b>Team</b>
                <FormControlLabel
                    className={classes.checkboxControl}
                    control={<Checkbox color='primary' checked={isChecked} onChange={handleChangeCheckBox} />}
                    label="Show deactive member"
                />
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <b>Member Type</b>
            </Grid>
        </Grid >
    );
};
