import React, { useRef } from 'react';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import loginImage from '../../assets/login.jpg';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
} from './styles';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Content>
        <div>
          <img className="logo" src={logo} alt="FindDev" />

          <h1>Complete your team</h1>

          <Form ref={formRef} onSubmit={() => {}}>
            <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

            <Input name="password" type="password" placeholder="Password" icon={FiLock} />

            <Button icon={FiLogIn}>
              Log in
            </Button>

            <Link to="/">
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
