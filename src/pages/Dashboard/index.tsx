import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { ThemeContext } from 'styled-components';

import Menu from '../../components/Menu';
import Button from '../../components/Button';
import Select from '../../components/Select';

import api from '../../services/api';

import {
  Container,
  Content,
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
  status: string;
  techs: ITechs[];
}

interface IFormData {
  tech: string;
}

const Dashboard: React.FC = () => {
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);

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

  const handleSearchDeveloper = useCallback(async (data: IFormData) => {
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
      <Menu />

      <Content>
        <Header>
          <HeaderContent>
            <img src={logo} alt="FindDev" />
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
              <Link to={`/profile/${developer.id}`}>
                <Developer key={developer.id}>
                  <main>
                    <header>
                      <img src={developer.avatar_url} alt={developer.name}/>

                      <div>
                        <div>
                          <strong>{developer.name}</strong>
                          <span className={developer.status}>{developer.status}</span>
                        </div>

                        <div>
                          <FiMapPin size={18} />
                          <p>Rio de Janeiro, RJ</p>
                        </div>
                      </div>
                    </header>

                    <Techs>
                      {developer.techs.map(tech => (
                        <p key={tech.id}>{tech.name}</p>
                      ))}
                    </Techs>
                  </main>

                  <FiChevronRight size={24} />
                </Developer>
              </Link>
            ))}
          </DevelopersContent>
        </DashboardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
