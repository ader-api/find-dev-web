import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSearch, FiChevronRight, FiGrid, FiSend } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Select from '../../components/Select';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import logo from '../../assets/logo-dark.svg';

import {
  Container,
  Content,
  Menu,
  Header,
  HeaderContent,
  DashboardContent,
  DevelopersContent,
  Developer,
  Techs,
} from './styles';

interface ITechs {
  id: number;
  name: string;
}

interface IDevelopers {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  techs: ITechs[];
}

interface FormData {
  tech: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, logOut } = useAuth();

  const [developers, setDevelopers] = useState<IDevelopers[]>([]);
  const [researchedDevelopers, setResearchedDevelopers] = useState<IDevelopers[]>([]);
  const [techs, setTechs] = useState<ITechs[]>([]);
  const [optionsTech, setOptionsTech] = useState<string[]>([]);

  const newDate = new Date()
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const loadDevelopers = useCallback(async (): Promise<void> => {
    await api.get('/developers').then(response => {
      setDevelopers(response.data);
      setResearchedDevelopers(response.data);
    });
  }, []);

  const loadTechs = useCallback(async (): Promise<void> => {
    await api.get('/techs').then(response => {
      setTechs(response.data);
    });
  }, []);

  // Load developers - When init app
  useEffect(() => {
    loadDevelopers();
  }, [loadDevelopers]);

  // Load techs - When init app
  useEffect(() => {
    loadTechs();
  }, [loadTechs]);

  useEffect(() => {
    techs.map(tech => {
      setOptionsTech(option => [...option, tech.name]);
    });
  }, [techs]);

  const handleSearchDeveloper = useCallback(async (data: FormData) => {
    if(data.tech !== '') {
      const filteredDevs = developers.filter(developer => {
        return developer.techs.find(tech => tech.name === data.tech);
      });

      if(!filteredDevs) {
        throw new Error('None developer was found');
      }

      setResearchedDevelopers(filteredDevs);
    } else {
      await api.get('/developers').then(response => {
        setResearchedDevelopers(response.data);
      });
    }
  }, [developers]);

  return (
    <Container>
      <Menu>
        <div>
          <img src={logo} alt="FindDev" />

          <ul>
            <li className="active">
              <Link to="/dashboard">
                <FiGrid size={20} />

                Dashboard
              </Link>
            </li>
            <li>
              <Link to="#">
                <FiSend size={20} />

                Messages
              </Link>
            </li>
          </ul>
        </div>


        <Link to="/">
          <FiLogOut size={20} />

          Log out
        </Link>
      </Menu>

      <Content>
        <Header>
          <HeaderContent>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRypNzzLfIB0sxt_f_XxEHF7eKk1OLaXlksbg&usqp=CAU" alt={user.name}/>
            <p>{user.name}</p>
          </HeaderContent>
        </Header>

        <DashboardContent>
          <Form ref={formRef} onSubmit={handleSearchDeveloper}>
            <div>
              <h1>Find a developer</h1>

              <main>
                <Select
                  name="tech"
                  options={optionsTech}
                  first_option="Tech"
                  styledContainer={{ marginRight: 12 }}
                />

                <Button icon={FiSearch}>
                  Search
                </Button>
              </main>
            </div>

            <time>{`${date}/${month}/${year}`}</time>
          </Form>

          <p>Developers {researchedDevelopers.length}</p>

          <DevelopersContent>
            {researchedDevelopers.map(developer => (
              <Developer key={developer.id}>
                <main>
                  <header>
                    <img src={developer.avatar_url} alt={developer.name}/>

                    <div>
                      <strong>{developer.name}</strong>

                      <Techs>
                        {developer.techs.map(tech => (
                          <p key={tech.id}>{tech.name}</p>
                        ))}
                      </Techs>
                    </div>
                  </header>

                  <p>{developer.email}</p>
                </main>

                <FiChevronRight size={24} />
              </Developer>
            ))}
          </DevelopersContent>
        </DashboardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
