import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FiLogOut, FiSearch, FiChevronRight } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Select from '../../components/Select';

import api from '../../services/api';

import {
  Container,
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
  const { logo } = useContext(ThemeContext);

  const formRef = useRef<FormHandles>(null);

  const [developers, setDevelopers] = useState<IDevelopers[]>([]);
  const [techs, setTechs] = useState<ITechs[]>([]);
  const [optionsTech, setOptionsTech] = useState<string[]>([]);

  useEffect(() => {
    async function loadDevelopers(): Promise<void> {
      await api.get('/developers').then(response => {
        setDevelopers(response.data);
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
      const filteredDevs = developers.find(developer => {
        return developer.techs.filter(tech => tech.name === data.tech);
      });

      console.log(filteredDevs);

      if(!filteredDevs) {
        throw new Error('None developer was found');
      }

      setDevelopers([filteredDevs]);
    } else {
      await api.get('/developers').then(response => {
        setDevelopers(response.data);
      });
    }
  }, [developers]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img className="logo" src={logo} alt="FindDev" />

          <Link to="/">
            <FiLogOut size={20} />
          </Link>
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
          {developers.map(developer => (
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
    </Container>
  );
};

export default Dashboard;
