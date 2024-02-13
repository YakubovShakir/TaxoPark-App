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
         Title,
         TitleText,
         HorLine,
         ItemData,
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

 

const Journal = ({navigation}) => {
    const [journal, setJournal] = useState([]);
      const [isModalAddVisible, setIsModalAddVisible] = useState(false);
      const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
      const [isModalChangeVisible, setIsModalChangeVisible] = useState(false);
        
      const [changeInfo, setChangeInfo] = useState(null);
      const fetchJournal = async () => {
            try {
              const response = await fetch('http://127.0.0.1:8002/api/get_journal');
              if (response.ok) {
                const data = await response.json();
                setJournal(data.journal);
              } else {
                console.error('Ошибка получения данных:', response.statusText);
              }
            } catch (error) {
              console.error('Ошибка при отправке запроса:', error);
            }
          };
    
        useEffect(() => {
           fetchJournal();
          }, []); 
        
          const handleAddJournal = async (values) => {
            try {
              const response = await fetch('http://127.0.0.1:8002/api/add_note', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
        
              if (response.ok) {
                console.log('Запись успешно добавлена');
                setIsModalAddVisible(false); // Закрыть модальное окно после успешного добавления
                fetchJournal();
              } else {
                console.error('Ошибка при добавлении записи');
              }
            } catch (error) {
              console.error('Ошибка при отправке запроса:', error);
            }
          };
    
          const handleDeleteJournal = async (noteId) => {
            try {
                console.log('Удаляется работник с ID:', noteId['id']);
              const response = await fetch(`http://127.0.0.1:8002/api/delete_note/${noteId['id']}`, {
                method: 'DELETE',
              });
        
              if (response.ok) {
                console.log('Запись успешно удалена');
        
                // После успешного удаления, вызовите fetchJournals для обновления данных
                setIsModalDeleteVisible(false); // Закрыть модальное окно после успешного добавления
    
                fetchJournal();
        
                // Дополнительные действия после успешного удаления
              } else {
                console.error('Ошибка при удалении записи');
              }
            } catch (error) {
              console.error('Ошибка при отправке запроса:', error);
            }
          };
          const handleEditJournal = async (values) => {
            try {
              const response = await fetch(`http://127.0.0.1:8002/api/edit_note/${values['id']}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
        
              if (response.ok) {
                console.log('Запись успешно изменена');
                setIsModalChangeVisible(false); // Закрыть модальное окно после успешного добавления
                fetchJournal();
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
                <PageTitle>Journal</PageTitle>

                <TitlesWrap>
                    <Title>
                        <TitleText>ID</TitleText>
                    </Title>
                    
                    <HorLine/>

                    <Title>
                        <TitleText>Время выезда</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Время прибытия</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Авто</TitleText>
                    </Title>

                    <HorLine/>

                    <Title>
                        <TitleText>Маршрут</TitleText>
                    </Title>
                    <Line/>

                </TitlesWrap>
                <ScrollView>
                <ItemsWrap>
                {journal.map(journal => (
            <ItemBlock key={journal.id}>
              <ItemData>
                <ItemDataText>{journal.id}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{journal.time_out}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{journal.time_in}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{journal.auto_id}</ItemDataText>
              </ItemData>

              <ItemData>
                <ItemDataText>{journal.routes_id}</ItemDataText>
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
                        <SubTitle>Добавить запись</SubTitle>
                        <Line/>

                        <Formik 
                    initialValues={{time_out: '',
                                    time_in: '',
                                    auto_id: '',
                                    routes_id: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        handleAddJournal(values);
                }}>

                    {({handleChange, handleBlur, handleSubmit, values}) => (
                    <StyledFormArea>

                         <MyTextInput 
                            label="Время выезда"
                            icon="dot-fill"
                            placeholder="ГГГГ:ММ:ДД ЧЧ:ММ"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('time_out')}
                            onBlur={handleBlur('time_out')}
                            value={values.time_out}
                        />
                     
                      <MyTextInput 
                            label="Время прибытия"
                            icon="dot-fill"
                            placeholder="ГГГГ:ММ:ДД ЧЧ:ММ"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('time_in')}
                            onBlur={handleBlur('time_in')}
                            value={values.time_in}
                        />
                        <MyTextInput 
                            label="Id автомобиля"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('auto_id')}
                            onBlur={handleBlur('auto_id')}
                            value={values.auto_id}
                        />
                         <MyTextInput 
                            label="Id маршрута"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('routes_id')}
                            onBlur={handleBlur('routes_id')}
                            value={values.routes_id}
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
                            handleDeleteJournal(values);
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
                                    const response = await fetch(`http://127.0.0.1:8002/api/get_note/${values.id}`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        setChangeInfo(data.note); // auto - объект с данными записи
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
                                time_out: String(changeInfo.time_out),
                                time_in: String(changeInfo.time_in),
                                auto_id: String(changeInfo.auto_id),
                                routes_id: String(changeInfo.routes_id),
                              }}
                onSubmit={(values) => {
                          console.log(values);
                          handleEditJournal(values);
                          setChangeInfo(null)
                        }}>
           {({handleChange, handleBlur, handleSubmit, values}) => (
          <StyledFormArea> 
                      <MyTextInput 
                            label="Время выезда"
                            icon="dot-fill"
                            placeholder="22.10.2023 12:00"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('time_out')}
                            onBlur={handleBlur('time_out')}
                            value={values.time_out}
                        />
                     
                      <MyTextInput 
                            label="Время прибытия"
                            icon="dot-fill"
                            placeholder="22.10.2023 14:00"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('time_in')}
                            onBlur={handleBlur('time_in')}
                            value={values.time_in}
                        />
                        <MyTextInput 
                            label="Id автомобиля"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('auto_id')}
                            onBlur={handleBlur('auto_id')}
                            value={values.auto_id}
                        />
                         <MyTextInput 
                            label="Id маршрута"
                            icon="dot-fill"
                            placeholder="1"
                            placeholderTextColor={secondary}
                            onChangeText={handleChange('routes_id')}
                            onBlur={handleBlur('routes_id')}
                            value={values.routes_id}
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

export default Journal;