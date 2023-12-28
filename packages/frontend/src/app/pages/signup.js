import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
  validatePhone,
  validateStrongPassword,
  isEmpty,
} from '../helpers/general';
import * as styles from './signup.module.css';

import AttributeGrid from '../components/AttributeGrid/AttributeGrid';
import Layout from '../components/Layout/Layout';
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

const SignupPage = (props) => {
  const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  };

  const errorState = {
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  };

  const [signupForm, setSignupForm] = useState(initialState);
  const [errorForm, setErrorForm] = useState(errorState);

  const handleChange = (id, e) => {
    const tempForm = { ...signupForm, [id]: e };
    setSignupForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem('phone', signupForm.phone);
    let validForm = true;
    const tempError = { ...errorState };

    if (isEmpty(signupForm.firstName) === true) {
      tempError.firstName = 'Field required';
      validForm = false;
    }

    if (isEmpty(signupForm.lastName) === true) {
      tempError.lastName = 'Field required';
      validForm = false;
    }

    if (validatePhone(signupForm.phone) !== true) {
      tempError.phone =
        'Please use a valid phone number, such as +33614221744.';
      validForm = false;
    }

    if (validateStrongPassword(signupForm.password) !== true) {
      tempError.password =
        'Password must have at least 8 characters, 1 lowercase, 1 uppercase and 1 numeric character.';
      validForm = false;
    }

    if (validForm === true) {
      setErrorForm(errorState);
      
      const data = {
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
        phone: signupForm.phone,
        password: signupForm.password
      };
      fetch(process.env.GATSBY_APP_API_URL+"/user", {
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
          console.log("Signup call was successful");
          window.localStorage.setItem("username", signupForm.phone);
          window.localStorage.setItem("password", signupForm.password);
          navigate('/accountSuccess');
        } else {
          resp.then(msg => {
            tempError.submit=msg.message;
            setErrorForm(tempError);
          })
          
        }
        
        
        
      })
      .catch((error) => {
        console.log(error)
      })
    } else {
      setErrorForm(tempError);
    }
  };

  return (
    <Layout disablePaddingBottom={true}>
      <div className={styles.root}>
        <div className={styles.signupFormContainer}>
          <h1 className={styles.title}>Create Account</h1>
          <span className={styles.subtitle}>
            Please enter your the information below:
          </span>
          <form
            noValidate
            className={styles.signupForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <FormInputField
              id={'firstName'}
              value={signupForm.firstName}
              handleChange={(id, e) => handleChange(id, e)}
              type={'input'}
              labelName={'First Name'}
              error={errorForm.firstName}
            />

            <FormInputField
              id={'lastName'}
              value={signupForm.lastName}
              handleChange={(id, e) => handleChange(id, e)}
              type={'input'}
              labelName={'Last Name'}
              error={errorForm.lastName}
            />
            <PhoneInput
              flags={flags}
              placeholder="Enter phone number"
              value={signupForm.phone}
              onChange={(v) => signupForm.phone=v}
            />
            <span className={styles.alert}>{errorForm.phone}</span>

            <FormInputField
              id={'password'}
              value={signupForm.password}
              handleChange={(id, e) => handleChange(id, e)}
              type={'password'}
              labelName={'Password'}
              error={errorForm.password}
            />
            <span className={styles.alert}>{errorForm.submit}</span>
            <Button fullWidth type={'submit'} level={'primary'}>
              create account
            </Button>
            <span className={styles.reminder}>Have an account?</span>
            <Button
              type={'button'}
              onClick={() => navigate('/login')}
              fullWidth
              level={'secondary'}
            >
              log in
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

export default SignupPage;
