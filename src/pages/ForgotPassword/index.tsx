import React, {
  useRef,
  useCallback,
} from 'react';
import { FiMail, FiArrowLeft, FiCornerDownRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import ForgotPasswordImage from '../../assets/forgot-password.png';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
} from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleForgotPasswordSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
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
        title: 'Error on make ForgotPassword',
        description: 'Verify the credentials and try again',
      });
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <div>
          <Link to="/">
            <FiArrowLeft size={20} />
            Go back
          </Link>

          <img className="logo" src={logo} alt="FindDev" />

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
