import React from 'react';

//Formik
import {Formik} from 'formik'
import * as FileSystem from 'expo-file-system';

//icons
import {Octicons} from '@expo/vector-icons';


import { Colors, 
         StyledContainer, 
         InnerContainer, 
         PageLogo, 
         PageTitle, 
         StyledFormArea, 
         SubTitle, 
         ButtonsWrapper,
         StyledMenuButton, 
         StyledInputLabel, 
         StyledTextInput, 
         ButtonText, 
         LeftIcon, 
         RightIcon, 
         MsgBox, 
         Line} from  '../components/styles';

import {View, Platform} from 'react-native';

const {brand, darkLight, primary, blue} = Colors;



const Home = ({navigation}) => {
    const handleDownload = async () => {
        try {
            const { uri } = await FileSystem.downloadAsync(
              'http://127.0.0.1:8002/api/download_data',
              FileSystem.documentDirectory + 'data.json'
            );
        
            // Вывод в консоль сообщения об успешном скачивании
            console.log('Файл успешно скачан:', uri);
          } catch (error) {
            console.error('Ошибка при скачивании данных', error);
          }
      };
    
    return(
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}></PageLogo>
                <PageTitle>Autopark Pro</PageTitle>
                <SubTitle>Main Menu</SubTitle> 

                <Line />

                <ButtonsWrapper>

                <StyledMenuButton onPress={(values) => {
                     console.log("Go to auto");
                     navigation.navigate("auto")
                }}>
                    <ButtonText>Auto</ButtonText>
                </StyledMenuButton>

                <StyledMenuButton onPress={(values) => {
                    console.log("Go to Personal");
                    navigation.navigate("personal")
                }}>
                    <ButtonText>Personal</ButtonText>
                </StyledMenuButton>
                
              
                <StyledMenuButton onPress={(values) => {
                      console.log("Go to routes");
                      navigation.navigate("routes")
                }}>
                    <ButtonText>Routes</ButtonText>
                </StyledMenuButton>

                <StyledMenuButton onPress={(values) => {
                      console.log("Go to journal");
                      navigation.navigate("journal")
                }}>
                    <ButtonText>Journal</ButtonText>
                </StyledMenuButton>

                </ButtonsWrapper>
                <ButtonsWrapper>
       
                <StyledMenuButton onPress={(values) => {
                    handleDownload();
                }}>
                    <ButtonText>Отчет</ButtonText>
                </StyledMenuButton>
                <StyledMenuButton onPress={() => navigation.navigate('help')}>
            <ButtonText>Справка</ButtonText>
          </StyledMenuButton>
                </ButtonsWrapper>
                </InnerContainer>
        </StyledContainer>
    );
}

export default Home;