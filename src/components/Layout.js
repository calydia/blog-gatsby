import React from 'react';
import { useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import  {useDarkMode} from "../components/useDarkMode"
import { lightTheme, darkTheme, GlobalStyles } from "../../themeConfig";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Toggle from "../components/Toggler";

const SkipLink = styled.a`
position: absolute;
left: -999px;
width: 1px;
height: 1px;
top: auto;
&:focus {
  background-color: ${({ theme }) => theme.skipBg};
  color: ${({ theme }) => theme.skipColor};
  display: inline-block;
  height: auto;
  left: 0;
  width: auto;
  position: absolute;
  margin: auto;
  padding: 0.7em;
  top: 2em;
  z-index: 2;
}
`;

export default ({ children }) => {

  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;


  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <SkipLink href="#skip-target" id="skip" className="skip-link">Skip to content</SkipLink>
      <Toggle theme={theme} toggleTheme={themeToggler} />

      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};