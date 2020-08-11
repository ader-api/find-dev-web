import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut, FiGrid, FiSend, FiSettings, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import ModalEditUser from '../ModalEditUser';

import { Container } from './styles';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  avatar_url: string;
}

const Menu: React.FC = () => {
  const { user, logOut, updateUser } = useAuth();
  const { addToast } = useToast();

  const [editingUser, setEditingUser] = useState<IUser>({} as IUser);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleLogOut = useCallback(async (user_id: number) => {
    await logOut(user_id);

    addToast({
      type: 'success',
      title: 'Logged out',
    });
  }, [addToast, logOut]);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen(!isEditModalOpen);
  }, [isEditModalOpen]);

  const handleEditUser = useCallback((user: IUser) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  }, []);

  const handleUpdateUser = useCallback((user: IUser) => {
    updateUser(user);
  }, [updateUser]);

  return (
    <>
      <Container>
        <div>
          <div className="userArea">
            <img src={user.avatar_url} alt={user.name}/>
            <strong>{user.name}</strong>

            <button type="button" onClick={() => { handleEditUser(user) }}>
              <FiSettings size={14} />

              Edit profile
            </button>
          </div>

          <nav>
            <NavLink to="/dashboard" activeClassName="active">
              <FiGrid size={20} />

              Dashboard
            </NavLink>

            <NavLink to="/messages" activeClassName="active">
              <FiSend size={20} />

              Messages
            </NavLink>
          </nav>
        </div>

        <button type="button" onClick={() => { handleLogOut(user.id) }}>
          <FiLogOut size={20} />

          Log out
        </button>
      </Container>

      <ModalEditUser
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingUser={editingUser}
        handleUpdateUser={handleUpdateUser}
      />
    </>
  );
};

export default Menu;
