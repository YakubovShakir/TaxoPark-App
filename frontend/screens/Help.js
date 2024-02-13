import React from 'react';
import { View, Text } from 'react-native';
import { StyledButton,Colors, StyledContainer, InnerContainer, PageTitle, SubTitle, Line, StyledMenuButton, ButtonText } from '../components/styles';

const { blue } = Colors;

const Help = ({ navigation }) => {
  return (
    <StyledContainer>
      <InnerContainer>
        <PageTitle>Справка</PageTitle>
        <SubTitle>Помощь и информация</SubTitle>

        <Line />

        <StyledButton onPress={() => console.log('Как использовать приложение')}>
          <ButtonText>Как использовать приложение</ButtonText>
        </StyledButton>

        <StyledButton onPress={() => console.log('Часто задаваемые вопросы')}>
          <ButtonText>Часто задаваемые вопросы</ButtonText>
        </StyledButton>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Help;
