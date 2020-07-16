import React, {
  useRef,
  useCallback,
  useContext,
} from 'react';
import { FiCornerDownRight, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { ThemeContext } from 'styled-components';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import ResetPasswordImage from '../../assets/forgot-password.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
} from './styles';

interface ResetPasswordFormData {
  password: string;
  confirm_password: string;
}

const ResetPassword: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleResetPasswordSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
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

      history.push('/');

      addToast({
        type: 'success',
        title: 'Password reseted',
        description: 'You can make login with new password',
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Error on reset password',
        description: 'Please check the credentials and try again',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Content>
        <div>
          <img className="logo" src={logo} alt="FindDev" />

          <h1>Reset password</h1>

          <Form ref={formRef} onSubmit={handleResetPasswordSubmit}>
            <Input
              name="password"
              type="password"
              placeholder="New password"
              icon={FiLock}
            />

            <Input
              name="confirm_password"
              type="password"
              placeholder="Confirm password"
              icon={FiLock}
            />

            <Button icon={FiCornerDownRight}>
              Reset
            </Button>
          </Form>
        </div>

        <img src={ResetPasswordImage} alt="Log in"/>
      </Content>
    </Container>
  );
};

export default ResetPassword;
