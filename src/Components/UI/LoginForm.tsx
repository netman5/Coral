import React from 'react';
import TextInput from '../UI/TextInput';
import CustomButton from './CustomButton';
import "../../Assets/styles/styles.css"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CustomCheckbox from './CustomCheckbox';
import { formData } from '../../types/appTypes';
import { useLoginFormik } from '../../hooks/useFormik';
import HeaderText from './HeaderText';
import { useNavigation } from '../../hooks/useNavigation';



interface LoginFormProps {
  onChange: (data: formData) => void;
  submit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const theme = useTheme();
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);

  const navigate = useNavigation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    setEmailValid(formik.errors.email ? false : true);
    setPasswordValid(formik.errors.password ? false : true);
    props.onChange(formik.values);
  };

  const { formik, isSubmitting } = useLoginFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      props.submit();
    },
  }, props.submit);

  return (
    <Box sx={{ width: '320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '50px' }}>
      <HeaderText
        header="Login"
        text="Thanks to come back on Coraly"
        headerStyle={{ marginBottom: '0px' }}
      />

      <Box component='form' sx={{ width: '320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }} onClick={formik.handleSubmit}>
        <Box>
          <TextInput
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            type='email'
            required
            color='secondary'
            InputStyles={{ width: '320px' }}
            size='small'
            onBlur={formik.handleBlur}
            error={!emailValid}
            helperText={formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant="body1" component="span">{formik.errors.email}</Typography>
          )}
        </Box>
        <Box>
          <TextInput
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={(event) => handleChange(event)}
            placeholder="Enter your password"
            type='password'
            required
            color='secondary'
            InputStyles={{ width: '320px' }}
            size='small'
            onBlur={formik.handleBlur}
            error={!passwordValid}
            helperText={formik.errors.password}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant="body1" component="span">{formik.errors.password}</Typography>
          )}
        </Box>
        <Box sx={{ width: '320px', display: 'flex', justifyContent: 'space-between' }}>
          <CustomCheckbox
            label="Remember me"
            name="rememberMe"
            // checked={data.rememberMe}
            onChange={handleChange}
            checkedStyle={{ '&.Mui-checked': { color: '#312E43' } }}
          />
          <CustomButton
            onClick={() => { navigate('/forget-password') }}
            color='success'
            variant='text'
            btnStyles={{ color: 'secondary', width: '150px', fontSty: 'normal', fontWeight: '600', lineHeight: '21px' }}
          >Forgot password</CustomButton>
        </Box>
        <CustomButton
          color='secondary'
          variant='contained'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loggin...' : 'Login'}
        </CustomButton>

        <Typography variant="body1" component="p" sx={{ width: '320px', fontSize: '14px', lineHeight: '18px', display: 'flex', alignItems: 'center', order: 1, color: `${theme.text.primary.neutral}` }}>
          Don't have an account?
          <CustomButton
            onClick={() => { navigate('/signup') }}
            color='success'
            variant='text'
            btnStyles={{ width: '114px', color: 'secondary' }}
          >Sign up now</CustomButton>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;