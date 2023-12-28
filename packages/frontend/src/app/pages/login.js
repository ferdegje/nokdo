import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { validatePhone, isEmpty } from '../helpers/general';
import * as styles from './login.module.css';

import AttributeGrid from '../components/AttributeGrid/AttributeGrid';
import Layout from '../components/Layout/Layout';
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

const LoginPage = (props) => {
  window.localStorage.setItem("gatsbyUser", JSON.stringify({}))

  const initialState = {
    email: '',
    password: '',
  };

  const errorState = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState(initialState);
  const [errorForm, setErrorForm] = useState(errorState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (id, e) => {
    const tempForm = { ...loginForm, [id]: e };
    setLoginForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validForm = true;
    const tempError = { ...errorForm };

    if (validatePhone(loginForm.phone) !== true) {
      tempError.phone =
        'Please use a valid phone number, such as +33614221744.';
      validForm = false;
    }

    if (isEmpty(loginForm.password) === true) {
      tempError.password = 'Field required';
      validForm = false;
    } else {
      tempError.password = '';
    }

    if (validForm === true) {
      setErrorForm(errorState);
      const data = {
        username: loginForm.phone,
        password: loginForm.password
      };
      fetch(process.env.GATSBY_APP_API_URL+"/user/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        const resp = response.json();
        if (response.ok) {
          setErrorForm({...errorForm, submit: "Vos identifiants ont ete valides."})
          resp.then(msg => {
            window.localStorage.setItem("gatsbyUser", JSON.stringify(msg))
            navigate('/shop');
          })
        } else {
          resp.then(msg => {
            setErrorForm({...errorForm, submit: msg.message});
          })
          
        }
        
        
        
      })
      .catch((error) => {
        console.log(error)
      })
      //mock login
      // if (loginForm.email !== 'error@example.com') {
      //   navigate('/account');
      //   window.localStorage.setItem('key', 'sampleToken');
      // } else {
      //   window.scrollTo(0, 0);
      //   setErrorMessage(
      //     'There is no such account associated with this email address'
      //   );
      // }
    } else {
      setErrorMessage('');
      setErrorForm(tempError);
    }
  };

  return (
    <Layout disablePaddingBottom={true}>
      <div
        className={`${styles.errorContainer} ${
          errorMessage !== '' ? styles.show : ''
        }`}
      >
        <span className={styles.errorMessage}>{errorMessage}</span>
      </div>

      <div className={styles.root}>
        <div className={styles.loginFormContainer}>
          <h1 className={styles.loginTitle}>Identification</h1>
          <span className={styles.subtitle}>
            Merci d'entrer votre telephone et mot de passe.
          </span>
          <form
            noValidate
            className={styles.loginForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <PhoneInput
              flags={flags}
              placeholder="Enter phone number"
              value={loginForm.phone}
              onChange={(v) => loginForm.phone=v}
            />
            <span className={styles.alert}>{errorForm.phone}</span>

            <FormInputField
              id={'password'}
              value={loginForm.password}
              handleChange={(id, e) => handleChange(id, e)}
              type={'password'}
              labelName={'Password'}
              error={errorForm.password}
            />
            <div className={styles.forgotPasswordContainer}>
              <Link to={'/forgot'} className={styles.forgotLink}>
                Forgot Password
              </Link>
            </div>
            <span className={styles.alert}>{errorForm.submit}</span>
            <Button fullWidth type={'submit'} level={'primary'}>
              LOG IN
            </Button>
            <span className={styles.createLink}>New Customer? </span>
            <Button
              type={'button'}
              onClick={() => navigate('/signup')}
              fullWidth
              level={'secondary'}
            >
              create an account
            </Button>
          </form>
        </div>

        <div className={styles.attributeGridContainer}>
          <AttributeGrid />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
