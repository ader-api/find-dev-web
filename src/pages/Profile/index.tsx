import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';
import { FiFacebook, FiLinkedin, FiGithub, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Menu from '../../components/Menu';

import api from '../../services/api';

import {
  Container,
  Content,
  Header,
  HeaderContent,
  ProfileContent,
  Techs,
} from './styles';

interface ITechs {
  id: number;
  name: string;
}

interface IDeveloper {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  status: string;
  techs: ITechs[];
}

const Profile: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const [developer, setDeveloper] = useState({} as IDeveloper);

  const loadDeveloper = useCallback(async (): Promise<void> => {
    const segment = window.location.pathname; // segment1/segment2/segment3
    const segmentArray = segment.split('/');
    const lastSegment = segmentArray.pop();

    await api.get(`/developers/${lastSegment}`).then(response => {
      setDeveloper(response.data);
      console.log(response.data.techs[0])
    });
  }, []);

  // Load developer - When init page
  useEffect(() => {
    loadDeveloper();
  }, [loadDeveloper]);

  return (
    <Container>
      <Menu />

      <Content>
        <Header>
          <HeaderContent>
            <img src={logo} alt="FindDev" />

            <Link to="/">
              <FiArrowLeft size={20} />
              Go back
            </Link>
          </HeaderContent>
        </Header>

        <ProfileContent>
          <header>
            <img src={developer.avatar_url} alt={developer.name}/>

            <main>
              <div>
                <div>
                  <h1>{developer.name}</h1>
                  <span className={developer.status}>{developer.status}</span>
                </div>

                <p className="role">Front-end developer</p>

                <p className="location">Rio de Janeiro, RJ</p>

                <div className="socials">
                  <a href="/">
                    <FiGithub size={18} />
                  </a>

                  <a href="/">
                    <FiLinkedin size={18} />
                  </a>

                  <a href="/">
                    <FiFacebook size={18} />
                  </a>
                </div>
              </div>
            </main>
          </header>

          <body>
            <div>
              <h2>About</h2>

              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut deleniti odit voluptatibus in explicabo amet quisquam quas quam quis consequuntur cum nostrum, culpa minima ex laborum quasi sint dicta. Saepe.</p>
            </div>

            <div>
              <h2>Knowledge</h2>

              <Techs>
              </Techs>
            </div>

            <div>
              <h2>Projects</h2>
            </div>
          </body>
        </ProfileContent>
      </Content>
    </Container>
  );
};

export default Profile;
