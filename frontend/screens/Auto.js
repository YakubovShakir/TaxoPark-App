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
         ButtonText, 
         LeftIconDot, 
         RightIcon, 
         MsgBox, 
         Line,
         TitlesWrap,
         Title,
         TitleText,
         HorLine,
         ItemData,
         ItemDataText,
         ItemsWrap,
         ItemBlock, 
         ButtonsWrapper,
         ModalView,
        StyledButtonChange,
        StyledTextInputChange,
        StyledInputLabelChange,
        StyledMenuButton} from  '../components/styles';

import {View, ScrollView, Modal, Text} from 'react-native';

const {brand, darkLight, primary, blue, secondary} = Colors;

 

const Auto = ({navigation}) => {
    const [autos, setAutos] = useState([]);

    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalChangeVisible, setIsModalChangeVisible] = useState(false);

    const [changeInfo, setChangeInfo] = useState(null);
  
      const fetchAutos = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8002/api/get_autos');
          if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
          } else {
            console.error('Ошибка получения данных:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
      useEffect(() => {
        // Загрузите данные при монтировании компонента
        fetchAutos();
      }, []); // Пустой массив зависимостей означает, что эффект будет выполнен только при монтировании компонента
    
       const handleAddAuto = async (values) => {
        try {
          const response = await fetch('http://127.0.0.1:8002/api/add_auto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Запись успешно добавлена');
            setIsModalAddVisible(false); // Закрыть модальное окно после успешного добавления
            fetchAutos();
          } else {
            console.error('Ошибка при добавлении записи');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };

      const handleDeleteAuto = async (autoId) => {
        try {
            console.log('Удаляется автомобиль с ID:', autoId['id']);
          const response = await fetch(`http://127.0.0.1:8002/api/delete_auto/${autoId['id']}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            console.log('Запись успешно удалена');
    
            // После успешного удаления, вызовите fetchAutos для обновления данных
            setIsModalDeleteVisible(false); // Закрыть модальное окно после успешного добавления

            fetchAutos();
    
            // Дополнительные действия после успешного удаления
          } else {
            console.error('Ошибка при удалении записи');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса:', error);
        }
      };
      const handleEditAuto = async (values) => {
        try {
          const response = await fetch(`http://127.0.0.1:8002/api/edit_auto/${values['id']}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            console.log('Запись успешно изменена');
            setIsModalChangeVisible(false); // Закрыть модальное окно после успешного добавления
            fetchAutos();
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
                <PageTitle>Auto</PageTitle>

                <TitlesWrap>
                    <Title>
                        <TitleText>ID</TitleText>
                    </Title>
                    
                    <HorLine/>

                    <Title>
                        <TitleText>Номер</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Цвет</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Марка</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Работник</TitleText>
                    </Title>
                    <Line/>

                </TitlesWrap>
               <ScrollView>
                <ItemsWrap>
            {autos.map(auto => (
            <ItemBlock key={auto.id}>
              <ItemData>
                <ItemDataText>{auto.id}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{auto.num}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{auto.color}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{auto.mark}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{auto.personell_id}</ItemDataText>
              </ItemData>  
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
                        <SubTitle>Добавить машину</SubTitle>
                        <Line/>

                        <Formik 
                    initialValues={{num: '', color: '', mark: '', personell_id:''}}
                    onSubmit={(values) => {
                        console.log(values);
                        handleAddAuto(values);
                }}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>

                         <MyTextInput 
                            label="Номер"
                            icon="dot-fill"
                            placeholder="М234ММ"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('num')}
                            onBlur={handleBlur('num')}
                            value={values.num}
                        />
                        <MyTextInput 
                            label="Цвет"
                            icon="dot-fill"
                            placeholder="Черный"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('color')}
                            onBlur={handleBlur('color')}
                            value={values.color}
                        />
                         <MyTextInput 
                            label="Марка"
                            icon="dot-fill"
                            placeholder="Mercedes"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('mark')}
                            onBlur={handleBlur('mark')}
                            value={values.mark}
                        />
                        <MyTextInput 
                            label="Водитель"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('personell_id')}
                            onBlur={handleBlur('personell_id')}
                            value={values.personell_id}
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
                        <SubTitle>Удалить машину</SubTitle>
                        <Line/>

                        <Formik 
                            initialValues={{id: ''}}
                            onSubmit={(values) => {
                            console.log(values);
                            handleDeleteAuto(values);
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
                                    const response = await fetch(`http://127.0.0.1:8002/api/get_auto/${values.id}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        setChangeInfo(data.auto); // auto - объект с данными записи
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
                            label="Введите id машины"
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
        <SubTitle>Информация об автомобиле</SubTitle>
        <Formik initialValues={{id: String(changeInfo.id),
                                color: String(changeInfo.color),
                                mark: String(changeInfo.mark),
                                num: String(changeInfo.num),
                                personell_id: String(changeInfo.personell_id)}}
                onSubmit={(values) => {
                          console.log(values);
                          handleEditAuto(values);
                          setChangeInfo(null)
                        }}>
           {({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea> 
          <MyTextInput 
                            label="Номер"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('num')}
                            onBlur={handleBlur('num')}
                            value={values.num}
        />
         <MyTextInput 
                            label="Цвет"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('color')}
                            onBlur={handleBlur('color')}
                            value={values.color}
        />
         <MyTextInput 
                            label="Марка"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('mark')}
                            onBlur={handleBlur('mark')}
                            value={values.mark}
        />
          <MyTextInput 
                            label="Работник"
                            icon="dot-fill"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('personell_id')}
                            onBlur={handleBlur('personell_id')}
                            value={values.personell_id}
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
export default Auto;