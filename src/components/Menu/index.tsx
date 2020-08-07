import React, { useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiLogOut, FiGrid, FiSend, FiSettings, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

const Menu: React.FC = () => {
  const { user, logOut } = useAuth();
  const { addToast } = useToast();

  const handleLogOut = useCallback(async (user_id: number) => {
    await logOut(user_id);

    addToast({
      type: 'success',
      title: 'Logged out',
    });
  }, [addToast, logOut]);

  return (
    <Container>
      <div>
        <div className="userArea">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRypNzzLfIB0sxt_f_XxEHF7eKk1OLaXlksbg&usqp=CAU" alt={user.name}/>
          <strong>{user.name}</strong>

          <Link to="/">
            <FiSettings size={14} />

            Edit profile
          </Link>
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

          <NavLink to="/account" activeClassName="active">
            <FiUser size={20} />

            Account
          </NavLink>
        </nav>
      </div>

      <button type="button" onClick={() => { handleLogOut(user.id) }}>
        <FiLogOut size={20} />

        Log out
      </button>
    </Container>
  );
};

export default Menu;
