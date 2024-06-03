'use client';
import { Container } from '@mui/material';
import styled from 'styled-components';

const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'white', // Assicurati che questo sia il colore che desideri; puoi usare anche theme.palette.background.paper per un bianco che si adatta al tema
  maxWidth: 'lg', // Questo imposta la larghezza massima al breakpoint 'lg'
}));
export default CustomContainer;
