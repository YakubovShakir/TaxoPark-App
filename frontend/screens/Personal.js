import React, {useState, useEffect} from 'react';

//Formik
import {Formik} from 'formik'


//icons
import {Octicons} from '@expo/vector-icons';

import { Colors, 
         StyledContainer, 
         InnerContainer, 
         PageLogo, 
         PageTitle, 
         StyledFormArea, 
         SubTitle, 
         StyledBlockButton, 
         StyledInputLabel, 
         StyledTextInput, 
         ButtonText, 
         LeftIcon, 
         RightIcon, 
         MsgBox, 
         Line,
         TitlesWrap,
         TitlePersonal,
         TitleText,
         HorLine,
         ItemDataPersonal,
         ItemDataText,
         ItemsWrap,
         ItemBlock, 
         ButtonsWrapper,
         ModalView,
         StyledMenuButton,
         StyledButtonChange,
         LeftIconDot,
         StyledInputLabelChange,
         StyledTextInputChange
         } from  '../components/styles';

import {ScrollView, View, Modal} from 'react-native';

const {brand, darkLight, primary, blue, secondary} = Colors;

 

const Personal = ({navigation}) => {
    const [personals, setPersonals] = useState([]);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalChangeVisible, setIsModalChangeVisible] = useState(false);
    
    const [changeInfo, setChangeInfo] = useState(null);
    const fetchPersonals = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8002/api/get_personals');
          if (response.ok) {
            const data = await response.json();
            setPersonals(data.personals);
          } else {
            console.error('Ошибка получения данных:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };

    useEffect(() => {
       fetchPersonals();
      }, []); 
    
      const handleAddPersonal = async (values) => {
        try {
          const response = await fetch('http://127.0.0.1:8002/api/add_personal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Запись успешно добавлена');
            setIsModalAddVisible(false); // Закрыть модальное окно после успешного добавления
            fetchPersonals();
          } else {
            console.error('Ошибка при добавлении записи');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };

      const handleDeletePersonal = async (personalId) => {
        try {
            console.log('Удаляется работник с ID:', personalId['id']);
          const response = await fetch(`http://127.0.0.1:8002/api/delete_personal/${personalId['id']}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            console.log('Запись успешно удалена');
    
            // После успешного удаления, вызовите fetchPersonals для обновления данных
            setIsModalDeleteVisible(false); // Закрыть модальное окно после успешного добавления

            fetchPersonals();
    
            // Дополнительные действия после успешного удаления
          } else {
            console.error('Ошибка при удалении записи');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
      const handleEditPersonal = async (values) => {
        try {
          const response = await fetch(`http://127.0.0.1:8002/api/edit_personal/${values['id']}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Запись успешно изменена');
            setIsModalChangeVisible(false); // Закрыть модальное окно после успешного добавления
            fetchPersonals();
          } else {
            console.error('Ошибка при добавлении записи');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
    return(
        <StyledContainer>
            <InnerContainer>
                <PageTitle>Personal</PageTitle>

                <TitlesWrap>
                    <TitlePersonal>
                        <TitleText>ID</TitleText>
                    </TitlePersonal>
                    
                    <HorLine/>

                    <TitlePersonal>
                        <TitleText>Имя</TitleText>
                    </TitlePersonal>

                    <HorLine/>

                    <TitlePersonal>
                        <TitleText>Фамилия</TitleText>
                    </TitlePersonal>

                    <HorLine/>

                    <TitlePersonal>
                        <TitleText>Маршрут</TitleText>
                    </TitlePersonal>

        

                  

                </TitlesWrap>

                <ScrollView>
                <ItemsWrap>
                {personals.map(personal => (
                    <ItemBlock key={personal.id}>
                        <ItemDataPersonal>
                            <ItemDataText>{personal.id}</ItemDataText>
                        </ItemDataPersonal>

                        <ItemDataPersonal>
                            <ItemDataText>{personal.first_name}</ItemDataText>
                        </ItemDataPersonal>

                        <ItemDataPersonal>
                            <ItemDataText>{personal.last_name}</ItemDataText>
                        </ItemDataPersonal>

                        <ItemDataPersonal>
                            <ItemDataText>{personal.pather_name}</ItemDataText>
                        </ItemDataPersonal>

                    </ItemBlock>    
                    ))}
                </ItemsWrap>
                </ScrollView>
                <ButtonsWrapper>
                <StyledBlockButton onPress={(values) => {
                     console.log("Add");
                     setIsModalAddVisible(true)
                }}>
                    <ButtonText>Добавить</ButtonText>
                </StyledBlockButton>
                
                <StyledBlockButton onPress={(values) => {
                     console.log("Delete");
                     setIsModalDeleteVisible(true)
                }}>
                    <ButtonText>Удалить</ButtonText>
                </StyledBlockButton>

                <StyledBlockButton onPress={(values) => {
                     console.log("Change");
                     setIsModalChangeVisible(true)
                }}>
                    <ButtonText>Изменить</ButtonText>
                </StyledBlockButton>
                </ButtonsWrapper>

                <Modal visible={isModalAddVisible} 
                       onRequestClose={() => { setIsModalAddVisible(false)}}
                       animationType="slide"
                       presentationStyle="pageSheet"
                >

                    <ModalView>
                        <SubTitle>Добавить работника</SubTitle>
                        <Line/>

                        <Formik 
                    initialValues={{first_name: '', last_name: '', pather_name: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        handleAddPersonal(values);
                }}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                    <StyledFormArea>

                         <MyTextInput 
                            label="Имя"
                            icon="dot-fill"
                            placeholder="Борис"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
                        />
                        <MyTextInput 
                            label="Фамилия"
                            icon="dot-fill"
                            placeholder="Иванов"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
                        />
                         <MyTextInput 
                            label="Номер маршрута"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('pather_name')}
                            onBlur={handleBlur('pather_name')}
                            value={values.pather_name}
                        />
                       
                        <StyledButtonChange onPress={handleSubmit}> 
                            <ButtonText>Подтвердить</ButtonText>
                        </StyledButtonChange>
                        <Line/>
                    </StyledFormArea>)}
                </Formik>
                <StyledMenuButton onPress={() => {
                            setIsModalAddVisible(false)
                        }}>
                        <ButtonText>Закрыть</ButtonText>
                </StyledMenuButton>
                    </ModalView>
                    
                </Modal>

                <Modal visible={isModalDeleteVisible} 
                       onRequestClose={() => { setIsModalDeleteVisible(false)}}
                       animationType="slide"
                       presentationStyle="pageSheet">

                    <ModalView>
                        <SubTitle>Удалить работника</SubTitle>
                        <Line/>

                        <Formik 
                            initialValues={{id: ''}}
                            onSubmit={(values) => {
                            console.log(values);
                            handleDeletePersonal(values);
                            }}
                        >

                        {({handleChange, handleBlur, handleSubmit, values}) => (
                        
                        <StyledFormArea>

                         <MyTextInput 
                            label="Id"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                        />
                      
                        <StyledButtonChange onPress={handleSubmit}> 
                            <ButtonText>Подтвердить</ButtonText>
                        </StyledButtonChange>

                        <Line/>
                    </StyledFormArea>)}
                </Formik>
                <StyledMenuButton onPress={() => {
                            setIsModalDeleteVisible(false)
                        }}>
                        <ButtonText>Закрыть</ButtonText>
                </StyledMenuButton>
                    </ModalView>
                </Modal>

                <Modal visible={isModalChangeVisible} 
                       onRequestClose={() => { setIsModalChangeVisible(false)}}
                       animationType="slide"
                       presentationStyle="pageSheet">

                    <ModalView>
                        <SubTitle>Изменить данные</SubTitle>
                        <Line/>
                        
                        <Formik 
                            initialValues={{id: ''}}
                            onSubmit={async (values) => {
                                try {
                                  setChangeInfo(null);
                                    const response = await fetch(`http://127.0.0.1:8002/api/get_personal/${values.id}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        setChangeInfo(data.personal); // auto - объект с данными записи
                                        console.log(changeInfo);
                                    } else {
                                        console.error('Ошибка при получении данных для редактирования');
                                    }
                                } catch (error) {
                                    console.error('Ошибка при отправке запроса:', error);
                                }
                            }}
                        >
                          {({handleChange, handleBlur, handleSubmit, values}) => (
                        
                        <StyledFormArea>

                         <MyTextInput 
                            label="Введите id работника"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                        />
                      
                        <StyledButtonChange onPress={handleSubmit}> 
                            <ButtonText>Подвердить</ButtonText>
                        </StyledButtonChange>

                        <Line/>
                    </StyledFormArea>)}
                    
                </Formik>
                {changeInfo && (
    <>
        <SubTitle>Информация о работнике</SubTitle>
        <Formik initialValues={{id: String(changeInfo.id),
                                first_name: String(changeInfo.first_name),
                                last_name: String(changeInfo.last_name),
                                pather_name: String(changeInfo.pather_name)}}
                onSubmit={(values) => {
                          console.log(values);
                          handleEditPersonal(values);
                          setChangeInfo(null)
                        }}>
           {({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea> 
          <MyTextInput 
                            label="Имя"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            value={values.first_name}
        />
         <MyTextInput 
                            label="Фамилия"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('last_name')}
                            onBlur={handleBlur('last_name')}
                            value={values.last_name}
        />
         <MyTextInput 
                            label="Маршрут"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('pather_name')}
                            onBlur={handleBlur('pather_name')}
                            value={values.pather_name}
        />
       
        <StyledButtonChange onPress={handleSubmit}> 
                            <ButtonText>Отправить</ButtonText>
                        </StyledButtonChange>
          </StyledFormArea>
          )}
        </Formik>
  
        <Line />
    </>
                )}
        <StyledMenuButton onPress={() => {
                            setIsModalChangeVisible(false)
                            setChangeInfo(null)
                        }}>
                        <ButtonText>Закрыть</ButtonText>
                </StyledMenuButton>
            
                    </ModalView>
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
export default Personal;