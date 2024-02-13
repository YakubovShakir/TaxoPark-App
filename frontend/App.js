import { StatusBar } from 'expo-status-bar';


//screens
import Login from './screens/Login';
import Home from './screens/Home';

//React navigation stack
import RootStack from './navigators/RootStack';

export default function App() {
  return  <RootStack/>;
}

 