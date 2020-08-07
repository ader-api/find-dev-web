import React, {
  useRef,
  useCallback,
  useContext,
} from 'react';
import { FiMail, FiArrowLeft, FiCornerDownRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ThemeContext } from 'styled-components';

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

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleForgotPasswordSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required('E-mail required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      addToast({
        type: 'success',
        title: 'E-mail sent',
        description: 'An e-mail was sent. Please check this.',
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Error on send e-mail',
        description: 'Verify the e-mail and try again',
      });
    }
  }, [addToast]);

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
          <h1>Forgot password</h1>

          <Form ref={formRef} onSubmit={handleForgotPasswordSubmit}>
            <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

            <Button icon={FiCornerDownRight}>
              Send
            </Button>
          </Form>
        </div>

        <img src={ForgotPasswordImage} alt="Log in"/>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
