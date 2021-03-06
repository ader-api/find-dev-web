import React, {
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowLeft,
  FiCornerDownRight,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ThemeContext } from 'styled-components';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import ForgotPasswordImage from '../../assets/find-dev.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Header,
  Content,
} from './styles';

interface FormRegisterData {
  user: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Register: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleRegisterSubmit = useCallback(async (data: FormRegisterData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        user: Yup.string()
          .required('User required'),
        email: Yup.string()
          .email()
          .required('E-mail required'),
        password: Yup.string()
          .required('Password required')
          .min(6, 'Min 6 characters'),
        confirm_password: Yup.string()
          .required('Password required')
          .min(6, 'Min 6 characters')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/developers', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Account created',
        description: 'Make the login to browse on FindDev',
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Error on create an account',
        description: 'Verify the credentials and try again',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Header>
        <img className="logo" src={logo} alt="FindDev" />

        <Link to="/">
          <FiArrowLeft size={20} />
          Go back
        </Link>
      </Header>

      <Content>
        <div>
          <h1>Register</h1>

          <Form ref={formRef} onSubmit={handleRegisterSubmit}>
            <Input name="user" type="text" placeholder="User" icon={FiUser} />

            <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

            <Input name="password" type="password" placeholder="Password" icon={FiLock} />

            <Input name="confirm_password" type="password" placeholder="Confirm password" icon={FiLock} />

            <Button icon={FiCornerDownRight}>
              Create an account
            </Button>
          </Form>
        </div>

        <img src={ForgotPasswordImage} alt="Log in"/>
      </Content>
    </Container>
  );
};

export default Register;
