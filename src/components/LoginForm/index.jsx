import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import { checkLogin, LOGIN_REQUEST_STATES } from "../../redux/slices/userSlice";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const onSubmit = ({ login, password }) => {
    dispatch(checkLogin(login, password));
  };

  return (
    <Grid container justify="center">
      <Paper style={{ position: "relative", zIndex: 0 }}>
        <Backdrop
          open={userData?.loginRequestState === LOGIN_REQUEST_STATES.AWAITING}
          style={{ position: "absolute", zIndex: 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Box p={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Login"
                  name="login"
                  inputRef={register({ required: true })}
                  error={errors.login}
                  autoFocus
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Hasło"
                  name="password"
                  type="password"
                  inputRef={register({ required: true })}
                  error={errors.password}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default LoginForm;
