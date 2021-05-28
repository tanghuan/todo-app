import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles, Theme } from '@material-ui/core/styles';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { useLoginMutation } from '../generated/graphql';
import { setToken, getToken } from '../token.storage';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: theme.spacing(6),
  },

  icon: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },

  form: {
    width: '100%',
  },

  github: {
    backgroundColor: theme.palette.text.primary,
  },
}));

const Login: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loginMutation, { data, loading, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: 'tang@gmail.com',
      password: 'tang12345',
    },
    validationSchema,
    onSubmit: async (values) => {
      await loginMutation({
        variables: {
          username: values.email,
          password: values.password,
        },
      });
    },
  });

  if (!loading && !error && data) {
    if (data.login?.access_token) {
      setToken(data.login?.access_token);
      history.push('/');
    }
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      {loading && <LinearProgress />}
      <Avatar className={classes.icon}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">Todo App</Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          variant="outlined"
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Box my={2}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>

      <Button startIcon={<GitHubIcon />} size="large" href="/api/auth/github">
        Github
      </Button>
      <Button startIcon={<GitHubIcon />} size="large" href="/api/auth/google">
        Google
      </Button>
    </Container>
  );
};

export default Login;
