import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    tertiary: '#1f2937',
    darkLight: '#9ca3af',
    brand: '#6d28d9',
    green: '#10b981',
    red: '#EF4444',
    blue: '#1d435b',
    lightBlue: '#036280',
    whiteDesert: '#E8EDE7',
    whiteBlue: '#00abbc',
    darkBlue: '#154167'
};

const { primary, secondary, tertiary, darkLight, brand, green, red, blue, lightBlue, whiteDesert, whiteBlue, darkBlue} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${blue};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 180px;
    height: 162px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${primary};
    padding: 10px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${secondary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${darkLight}; 
    color: ${primary};
    padding: 15px;
    padding-left:55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;  
`
 
export const StyledInputLabel = styled.Text`
    color: ${primary};
    font-size: 15px;
    text-align: left;
    font-weight: bold;
`;

export const StyledTextInputChange = styled.TextInput`
    background-color: ${primary}; 
    color: ${tertiary};
    padding-left:55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: bold;
    height: 35px;
    margin-vertical: 3px;
    margin-bottom: 10px;
`

export const StyledInputLabelChange = styled.Text`
    color: ${primary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIconDot = styled.TouchableOpacity`
    left: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`;  

export const LeftIcon = styled.TouchableOpacity`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;  

export const RightIcon = styled.TouchableOpacity`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const ButtonsWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-vertical: 25px
    
`;
export const StyledMenuButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${lightBlue};
    justify-content: center;
    align-items: center;
    border-raduis: 5px;
    margin-vertical: 5px;
    width: 40%;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 5px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-raduis: 5px;
    margin-vertical: 5px;
    height: 30px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

export const StyledButtonChange = styled.TouchableOpacity`
    background-color: ${lightBlue};
    justify-content: center;
    align-items: center;
    border: 1px;
    border-color: transparent;
    border-raduis: 1px;
    margin-vertical: 15px;
    height: 30px;
`;

export const StyledBlockButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${lightBlue};
    justify-content: center;
    align-items: center;
    border-raduis: 5px;
    margin-horizontal: 5px;
    width: 30%;
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 17px;
    font-weight: bold
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;
export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${primary};
    margin-vertical: 10px;
`;

export const TitlesWrap = styled.View`
    background-color: transparent;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
`;
export const Title = styled.View`
    margin-horizontal: 4px;
    width: 17%;
    align-items: center;
    justify-content: center;
`;

export const TitlePersonal = styled.View`
    margin-horizontal: 4px;
    width: 22%;
    align-items: center;
    justify-content: center;
`;

export const TitleRoutes = styled.View`
    margin-horizontal: 4px;
    width: 47%;
    align-items: center;
    justify-content: center;
`;

export const TitleText = styled.Text`
    color: ${whiteDesert};
    font-size: 13px;
    font-weight: bold;
`;

export const HorLine = styled.View`
    height: 100%;
    width: 1px;
    background-color: ${primary};
`

export const ItemsWrap = styled.View`
    width: 100%;
`

export const ItemBlock = styled.View`
    background-color: transparent;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 15px
`

export const ItemData = styled.View`
    margin-horizontal: 4px;
    width: 17%;
    align-items: center;
    justify-content: center;
`

export const ItemDataPersonal = styled.View`
    margin-horizontal: 4px;
    width: 22%;
    align-items: center;
    justify-content: center;
`

export const ItemDataRoutes = styled.View`
    margin-horizontal: 4px;
    width: 46%;
    align-items: center;
    justify-content: center;
`
export const ItemDataText = styled.Text`
    color: ${primary};
    font-size: 9.4px;
    font-weight: bold;
`

export const ModalView = styled.View`
    flex: 1;
    background-color: ${darkBlue};
    padding: 60px;
    align-items: center;
`

export const ICON_SIZE = 45
export const BORDER_SIZE = 1

export const CloseButton = styled.TouchableOpacity`
    position:  absolute;
    top: 2%;
    right: 3%;
    background-color: ${blue};
    width: ${ICON_SIZE + BORDER_SIZE}px;
    height: ${ICON_SIZE + BORDER_SIZE}px;
    border-radius: ${(ICON_SIZE + BORDER_SIZE) / 2}px;
    border-width: ${BORDER_SIZE}px;
`

export const SubText = styled.Text`
    color: ${primary};
    margin-right: 3px;
`
export const SubLink = styled.TouchableOpacity`
`