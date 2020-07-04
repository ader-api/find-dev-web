import React, {
  useRef,
  useCallback,
} from 'react';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErrors';

import loginImage from '../../assets/login.jpg';
import logo from '../../assets/logo.svg';

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
  const formRef = useRef<FormHandles>(null);

  const handleLoginSubmit = useCallback(async (data: LoginFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail required'),
        password: Yup.string().required('Password required'),
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
