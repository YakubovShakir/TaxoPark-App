import {React, useState} from 'react';

//Formik
import {Formik} from 'formik'


//icons
import {Octicons} from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

import { Colors, StyledContainer, InnerContainer, PageLogo, PageTitle, StyledFormArea, SubTitle, StyledButton, StyledInputLabel, StyledTextInput, ButtonText, LeftIcon, RightIcon, MsgBox, Line,
        CloseButton,
        ICON_SIZE,
        SubLink,
        SubText,
        LeftIconDot,
        StyledInputLabelChange,
        StyledTextInputChange,
        StyledMenuButton
    } from  './../components/styles';
 
import {View, Modal, Text} from 'react-native'; 
  
const {brand, darkLight, primary, blue} = Colors;

 

const Login = ({navigation}) => {
    [isModalSignUpVisible, setIsModalSignUpVisible] = useState(false);
    const [answer, setAnswer] = useState(null);

    const handleSignup = async (values) => {
        try {
            if (values.password != values.repeatPassword) {
                setAnswer('Пароли должны быть одинаковыми')
            } else {
                const response = await fetch('http://127.0.0.1:8002/api/signup', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  });
                
                  if (response.ok) {
                    console.log('Пользователь успешно добавлен');
                    setIsModalSignUpVisible(false); // Закрыть модальное окно после успешного добавления
                    //fetchAutos();
                    setAnswer(null);
                  } else {
                    setAnswer('Пользователь с таким логином или почтой уже существует');
                    //console.error('Ошибка при добавлении пользователя');
                  }
            }
        
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
      
      const handleLogin = async (values) => {
        try {
              const response = await fetch('http://127.0.0.1:8002/api/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  });
                
                  if (response.ok) {
                    const userData = await response.json();

                    //console.log('Пользователь успешно вошел:', userData);
                    //authContext.login(userData);
                    //authContext.login(userData);
                    //fetchAutos();
                    navigation.navigate("home")
                    setAnswer(null);
                  } else {
                    setAnswer('Логин или пароль неверны');
                    //console.error('Ошибка при добавлении пользователя');
                  }
        
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
    return(
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/logo.png')}></PageLogo>
                <PageTitle>Autopark Pro</PageTitle>
                <SubTitle>Account Login</SubTitle> 

                <Formik 
                    initialValues={{login: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        handleLogin(values);
                }}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        <MyTextInput 
                            label="Login"
                            icon="person"
                            placeholder="Name"
                            placeholderTextColor={blue}
                            onChangeText={handleChange('login')}
                            onBlur={handleBlur('login')}
                            value={values.login}
                        />

                         <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * * "
                            placeholderTextColor={blue}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                        />
                         {answer && (    
                                    <>
                                    <MsgBox style={{color:'#fff'}}>{answer}</MsgBox>
                                    </>
                        )}
                                   
                        <StyledButton onPress={handleSubmit}> 
                            <ButtonText>Вход</ButtonText>
                        </StyledButton> 

                        <View style={{marginTop: 5, alignItems: 'center'}}>
                            <SubLink onPress={() => {
                                setAnswer(null);
                                setIsModalSignUpVisible(true);
                            }}><Text style={{color:'#fff'}}>Регистрация</Text>
                            </SubLink>
                        </View>

                        <Line/>
                    </StyledFormArea>)}
                </Formik>

                <Modal visible={isModalSignUpVisible} 
                       onRequestClose={() => { setIsModalSignUpVisible(false)}}
                       animationType="slide"
                       presentationStyle="pageSheet">
                    <StyledContainer>
                        <InnerContainer>
                        <CloseButton
                            onPress={() => {
                                setIsModalSignUpVisible(!isModalSignUpVisible)
                                setAnswer(null)
                            }}
                        > 
                            <Icon name={'close'} size={ICON_SIZE} color="#000" />
                        </CloseButton>
                            <PageTitle>Create an account</PageTitle>
                
                            <Formik 
                                initialValues={{login: '', password: '', repeatPassword: ''}}
                                onSubmit={(values) => {
                                    console.log(values);
                                    //setIsModalSignUpVisible(false);
                                    handleSignup(values);
                            }}>

                            {({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <MyTextInput 
                                        placeholder="Login"
                                        icon="person"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('login')}
                                        onBlur={handleBlur('login')}
                                        value={values.login}
                                    />

                                    <MyTextInput 
                                        placeholder="Password"
                                        icon="lock"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={true}
                                    />
                                    <MyTextInput 
                                        placeholder="Repeat password"
                                        icon="lock"
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange('repeatPassword')}
                                        onBlur={handleBlur('repeatPassword')}
                                        value={values.repeatPassword}
                                        secureTextEntry={true}
                                    />
                                    {answer && (    
                                    <>
                                    <MsgBox style={{color:'#fff'}}>{answer}</MsgBox>
                                    </>
                                    )}
                                   
                                    <StyledButton onPress={handleSubmit}> 
                                        <ButtonText>Создать аккаунт</ButtonText>
                                    </StyledButton>
                                
                                </StyledFormArea>
                            )}
                </Formik>
                </InnerContainer> 
                </StyledContainer>
                </Modal>
            </InnerContainer>
        </StyledContainer>
    );
}


const MyTextInput = ({label, icon, ...props}) => {
    return (
    <View>
        <LeftIconDot>
            <Octicons name={icon} size={15} color="black"/>
        </LeftIconDot>
        <StyledInputLabelChange>{label}</StyledInputLabelChange>
        <StyledTextInputChange {...props} />
    </View>);
  };
  

export default Login;