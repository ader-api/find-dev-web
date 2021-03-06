import React, {
  useRef,
  useCallback,
  useContext,
} from 'react';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import loginImage from '../../assets/find-dev.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { logIn } = useAuth();
  const { addToast } = useToast();

  const handleLoginSubmit = useCallback(async (data: LoginFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail required'),
        password: Yup.string().required('Password required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await logIn({
        email: data.email,
        password: data.password,
      });

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Logged in',
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Error on make login',
        description: 'Verify the credentials and try again',
      });
    }
  }, [addToast, history, logIn]);

  return (
    <Container>
      <Content>
        <div>
          <img className="logo" src={logo} alt="FindDev" />

          <h1>Complete your team</h1>

          <Form ref={formRef} onSubmit={handleLoginSubmit}>
            <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

            <Input name="password" type="password" placeholder="Password" icon={FiLock} />

            <Button icon={FiLogIn}>
              Log in
            </Button>

            <Link to="/forgot-password">
              Forgot password
            </Link>

            <Link to="/register">
              Register
            </Link>
          </Form>
        </div>

        <img src={loginImage} alt="Log in"/>
      </Content>
    </Container>
  );
};

export default Login;
