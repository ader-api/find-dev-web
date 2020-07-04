import React, {
  useRef,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCornerDownRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

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
  const formRef = useRef<FormHandles>(null);

  const handleRegisterSubmit = useCallback(async (data: FormRegisterData) => {
    try {
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
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Header>
        <img className="logo" src={logo} alt="FindDev" />

        <Link to="/">
          <FiArrowLeft size={20} />
          Back
        </Link>
      </Header>

      <Content>
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
      </Content>
    </Container>
  );
};

export default Register;
