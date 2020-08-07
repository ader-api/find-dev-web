import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiLogOut, FiGrid, FiSend } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Menu: React.FC = () => {
  const { user, logOut } = useAuth();

  return (
    <Container>
      <div>
        <div className="userArea">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRypNzzLfIB0sxt_f_XxEHF7eKk1OLaXlksbg&usqp=CAU" alt={user.name}/>
          <strong>{user.name}</strong>
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


      <Link to="/">
        <FiLogOut size={20} />

        Log out
      </Link>
    </Container>
  );
};

export default Menu;
