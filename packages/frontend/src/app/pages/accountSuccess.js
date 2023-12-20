import React, { useState } from 'react';
import { navigate } from 'gatsby';

import * as styles from './accountSuccess.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import ReactCodeInput from 'react-code-input';

import Button from '../components/Button';

const AccountSuccessPage = (props) => {
  const errorState = {
    submit: ""
  };
  const formState = {
    code: undefined,
  }
  const [errorForm, setErrorForm] = useState(errorState);
  const [valuesForm, setValuesForm] = useState(formState);
  const handleChange = (value) => {
    // const tempForm = { ...signupForm, [id]: e };
    console.log("handleChange");
    const tempValues = {...valuesForm, code: value};
    setValuesForm(tempValues);
    setErrorForm({...errorForm, submit: ""})
    console.log(tempValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorForm({...errorForm, submit: "Verification du code..."})
    const data = {
      phone: window.localStorage.getItem('phone'),
      code: valuesForm.code
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
        setErrorForm({...errorForm, submit: "Le code a ete valide"})
        navigate('/shop');
      } else {
        resp.then(msg => {
          setErrorForm({...errorForm, submit: msg.message});
        })
        
      }
      
      
      
    })
    .catch((error) => {
      console.log(error)
    })
  };
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Compte cree</h1>
          <p>
            Un SMS a du arriver sur votre telephone, contenant un code. Merci de le rentrer ci dessous.
          </p>
          <form
            noValidate
            className={styles.signupForm}
            onSubmit={(e) => handleSubmit(e)}
          >
          <div>
          <ReactCodeInput type='text' fields={6} onChange={(value) => handleChange(value)} />
          </div>
          <div>
          <span className={styles.alert}>{errorForm.submit}</span>
          <Button fullWidth type={'submit'} level={'primary'}>
              Verifier
            </Button>
          </div>
          </form>
          {/* <div className={styles.actionContainer}>
            <ActionCard
              title={'Accounts'}
              icon={'user'}
              subtitle={'Check your account settings'}
              link={'/account/settings'}
            />

            <ActionCard
              title={'Shop'}
              icon={'bag'}
              subtitle={'Continue Shopping'}
              link={'/shop'}
            />
          </div> */}
        </div>
      </Container>
    </Layout>
  );
};

export default AccountSuccessPage;
