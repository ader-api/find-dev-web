import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSearch, FiChevronRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Select from '../../components/Select';

import api from '../../services/api';

import logo from '../../assets/logo-dark.svg';

import {
  Container,
  Content,
  Menu,
  Header,
  HeaderContent,
  DashboardContent,
  ResultContent,
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

  const [developers, setDevelopers] = useState<IDevelopers[]>([]);
  const [researchedDevelopers, setResearchedDevelopers] = useState<IDevelopers[]>([]);
  const [techs, setTechs] = useState<ITechs[]>([]);
  const [optionsTech, setOptionsTech] = useState<string[]>([]);

  useEffect(() => {
    async function loadDevelopers(): Promise<void> {
      await api.get('/developers').then(response => {
        setDevelopers(response.data);
        setResearchedDevelopers(response.data);
      });
    }

    loadDevelopers();
  }, []);

  useEffect(() => {
    async function loadTechs(): Promise<void> {
      await api.get('/techs').then(response => {
        setTechs(response.data);
      });
    }

    loadTechs();
  }, []);

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
        <img src={logo} alt="FindDev" />

        <Link to="/">
          <FiLogOut size={20} />

          Log out
        </Link>
      </Menu>

      <Content>
        <Header>
          <HeaderContent>
            <img src="https://avatars1.githubusercontent.com/u/45057940?s=460&u=7b54fe90dcf704f572207b0a2a7f59f948fdd63e&v=4" alt=""/>
            <p>Recruiter</p>
          </HeaderContent>
        </Header>

        <DashboardContent>
          <Form ref={formRef} onSubmit={handleSearchDeveloper}>
            <div>
              <h1>Find a developer</h1>

              <Select name="tech" options={optionsTech} first_option="Tech"/>

              <Button icon={FiSearch}>
                Search
              </Button>
            </div>
          </Form>

          <ResultContent>
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
          </ResultContent>
        </DashboardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
