import { yupResolver } from "@hookform/resolvers/yup";
import {
    Box, Button, Checkbox, Container, CssBaseline,
    FormControlLabel, Grid, Link, TextField, Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "src/store/store";
import * as yup from "yup";
import { loginAuth } from "./SignInSlice";
import { DataFormLogin } from "./type";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).max(20).required(),
});
const useStyles = makeStyles(() => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 450,
        margin: "100px auto",
        padding: 25,
        border: "1px solid #c5c5c5",
        borderRadius: 10,
        boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)"
    },
    form: {
        width: "100%",
        marginTop: 8,
    },
    submit: {
        margin: " 24px 0 16px",
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [remember, setRemember] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
    function handleOnSumitForm(data: DataFormLogin) {
        dispatch(
            loginAuth({
                userNameOrEmailAddress: data.username,
                password: data.password,
                rememberClient: remember,
            })
        );
    }
    function handleRememberAccount(e: React.ChangeEvent<HTMLInputElement>) {
        setRemember(e.target.checked);
    }
    useEffect(() => {
        if (token) {
            history.push("/home");
        }
    }, [token, history]);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <form
                    onSubmit={handleSubmit(handleOnSumitForm)}
                    className={classes.form}
                    noValidate
                >
                    <TextField
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username ? "username is required!" : ""}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password?.message : ""}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Box sx={{ textAlign: "left", marginBottom: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"

                                    onChange={handleRememberAccount}
                                />
                            }
                            label="Remember me"
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: 20 }}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item sx={{ ml: "auto" }}>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item sx={{ m: "auto" }}>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
