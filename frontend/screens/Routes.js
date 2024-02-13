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
         TitleRoutes,
         TitleText,
         HorLine,
         ItemDataRoutes,
         ItemDataText,
         ItemsWrap,
         ItemBlock, 
         ButtonsWrapper,
         ModalView,
         StyledMenuButton,
         StyledButtonChange,
         LeftIconDot,
         StyledInputLabelChange,
         StyledTextInputChange} from  '../components/styles';

import {ScrollView, View, Modal} from 'react-native';

const {brand, darkLight, primary, blue, secondary} = Colors;

 

const Routes = ({navigation}) => {
    const [routes, setRoutes] = useState([]);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalChangeVisible, setIsModalChangeVisible] = useState(false);
      
    const [changeInfo, setChangeInfo] = useState(null);
    const fetchRoutes = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8002/api/get_routes');
            if (response.ok) {
              const data = await response.json();
              setRoutes(data.routes);
            } else {
              console.error('Ошибка получения данных:', response.statusText);
            }
          } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
          }
        };
  
      useEffect(() => {
         fetchRoutes();
        }, []); 
      
        const handleAddRoutes = async (values) => {
          try {
            const response = await fetch('http://127.0.0.1:8002/api/add_route', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            if (response.ok) {
              console.log('Запись успешно добавлена');
              setIsModalAddVisible(false); // Закрыть модальное окно после успешного добавления
              fetchRoutes();
            } else {
              console.error('Ошибка при добавлении записи');
            }
          } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
          }
        };
  
        const handleDeleteRoutes = async (routesId) => {
          try {
              console.log('Удаляется работник с ID:', routesId['id']);
            const response = await fetch(`http://127.0.0.1:8002/api/delete_route/${routesId['id']}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              console.log('Запись успешно удалена');
      
              // После успешного удаления, вызовите fetchRoutess для обновления данных
              setIsModalDeleteVisible(false); // Закрыть модальное окно после успешного добавления
  
              fetchRoutes();
      
              // Дополнительные действия после успешного удаления
            } else {
              console.error('Ошибка при удалении записи');
            }
          } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
          }
        };
        const handleEditRoutes = async (values) => {
          try {
            const response = await fetch(`http://127.0.0.1:8002/api/edit_route/${values['id']}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            if (response.ok) {
              console.log('Запись успешно изменена');
              setIsModalChangeVisible(false); // Закрыть модальное окно после успешного добавления
              fetchRoutes();
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
                <PageTitle>Routes</PageTitle>

                <TitlesWrap>
                    <TitleRoutes>
                        <TitleText>ID</TitleText>
                    </TitleRoutes>
                    
                    <HorLine/>

                    <TitleRoutes>
                        <TitleText>Название</TitleText>
                    </TitleRoutes>

                  

                </TitlesWrap>
                <ScrollView>
                <ItemsWrap>
                    {routes.map(routes =>(
                    <ItemBlock key={routes.id}>
                        <ItemDataRoutes>
                            <ItemDataText>{routes.id}</ItemDataText>
                        </ItemDataRoutes>

                        <ItemDataRoutes>
                            <ItemDataText>{routes.name}</ItemDataText>
                        </ItemDataRoutes>
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
                        <SubTitle>Добавить маршрут</SubTitle>
                        <Line/>

                        <Formik 
                    initialValues={{name: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        handleAddRoutes(values);
                }}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                    <StyledFormArea>

                         <MyTextInput 
                            label="Название"
                            icon="dot-fill"
                            placeholder="Откуда - Куда"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
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
                        <SubTitle>Удалить маршрут</SubTitle>
                        <Line/>

                        <Formik 
                            initialValues={{id: ''}}
                            onSubmit={(values) => {
                            console.log(values);
                            handleDeleteRoutes(values);
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
                                    const response = await fetch(`http://127.0.0.1:8002/api/get_route/${values.id}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        setChangeInfo(data.route); // auto - объект с данными записи
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
                            label="Введите id маршрута"
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
        <SubTitle>Информация о маршруте</SubTitle>
        <Formik initialValues={{id: String(changeInfo.id),
                                name: String(changeInfo.name)}}
                onSubmit={(values) => {
                          console.log(values);
                          handleEditRoutes(values);
                          setChangeInfo(null)
                        }}>
           {({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea> 
          <MyTextInput 
                            label="Название"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
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

export default Routes;