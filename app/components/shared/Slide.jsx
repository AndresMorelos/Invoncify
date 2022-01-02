import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Button from './Button'

const Wrapper = styled.div`
  height: 100%;
  widht: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 40px;
  background: #f9fafa;
  ${props => `
    background: -webkit-linear-gradient(to bottom, ${props.fromColor}, ${props.toColor
    });
    background: linear-gradient(to bottom, ${props.fromColor}, ${props.toColor
    });
  `} > * {
    flex: 1;
  }
`;

const Image = styled.img`
  ${props =>
    props.size &&
    `
    max-width: ${props.size};
  `};
`;

const Header = styled.h1`
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Text = styled.div`
  padding-top: 20px;
  text-align: center;
  ${props =>
    props.inverted &&
    `
    color: white;
  `};
`;

const Description = styled.p`
  max-width: 80%;
  margin: 0 auto 20px auto;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`

const Input = styled.input`
  width: 100%;
  margin-bottom: 5px;
`

const Slide = function (props) {
  const [password, setPassword] = useState(undefined);
  const {
    inverted,
    heading,
    description,
    imgSrc,
    imgSize,
    fromColor,
    toColor,
    formAction,
  } = props;

  const buttonHandler = () => {
    formAction(password)
  }

  const onKeyPressed = (event) => {
    const key = event.keyCode || event.which;
    if (key == 13) {
      formAction(password)
    }
  }

  return (
    <Wrapper fromColor={fromColor} toColor={toColor}>
      <Text inverted={inverted}>
        <Header>{heading}</Header>
        <Description>{description}</Description>
      </Text>
      <Image size={imgSize} src={imgSrc} />
      <FormWrapper>
        <Input
          type='password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onKeyPress={onKeyPressed}
        />
        <Button onClick={buttonHandler}>Ingress</Button>
      </FormWrapper>
    </Wrapper>
  );
}

Slide.propTypes = {
  description: PropTypes.string.isRequired,
  fromColor: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  imgSize: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  toColor: PropTypes.string.isRequired,
  formAction: PropTypes.func.isRequired,
};

Slide.defaultProps = {
  imgSize: '400px',
  inverted: false,
};

export default Slide;
