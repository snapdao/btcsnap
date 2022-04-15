import React from 'react';
import banner from './banner.png';
import { Container, Label } from 'semantic-ui-react';

const Banner = () => {
  return (
    <Container className="Banner-container" vertical="center">
      <img src={banner} alt="" className="Img-box" />
      <p className="App-Container">
        <Label color="blue">
          {' '}
          Please ensure you have Metamask Flask
          Installed for this example,{' '}
          <a
            href="https://chrome.google.com/webstore/detail/metamask-flask-developmen/ljfoeinjpaedjfecbmggjgodbgkmjkjk"
            id="bannerLink"
            target="_blank">
            {' '}
            Click here to install
          </a>
        </Label>
      </p>
    </Container>
  );
};

export default Banner;
