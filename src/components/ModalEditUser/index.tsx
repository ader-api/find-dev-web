import React, { useRef, useCallback } from 'react';
import { FiUserCheck, FiX } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import { Form } from './styles';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingUser: IUser;
  handleUpdateUser: (user: IUser) => void;
}

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url: string;
}

const ModalEditUser: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingUser,
  handleUpdateUser,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmitUser = useCallback(async ({
    name,
    email,
    password,
    confirm_password,
    avatar_url,
  }: IFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        avatar_url: Yup.string()
        .required('Avatar required'),
        name: Yup.string()
          .required('Name required'),
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

      const id = editingUser.id;

      const userData = {
        id,
        name,
        email,
        password,
        confirm_password,
        avatar_url,
      };

      await schema.validate(userData, {
        abortEarly: false,
      });

      handleUpdateUser(userData);
      setIsOpen();

      addToast({
        type: 'success',
        title: 'Update profile',
      });
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Error on update profile',
        description: 'Verify the credentials and try again',
      });
    }
  }, [handleUpdateUser, setIsOpen, editingUser.id, addToast]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} initialData={editingUser} onSubmit={handleSubmitUser}>
        <header>
          <h1>Edit profile</h1>

          <button type="button" onClick={setIsOpen}>
            <FiX size={16} />
          </button>
        </header>

        <Input name="avatar_url" placeholder="Image link" type="text"/>

        <Input name="name" placeholder="Name" type="text"/>

        <Input name="email" placeholder="E-mail" type="email"/>

        <Input name="password" placeholder="Password" type="password"/>

        <Input name="confirm_password" placeholder="Confirm password" type="password"/>

        <Button icon={FiUserCheck}>
          Save
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalEditUser;
