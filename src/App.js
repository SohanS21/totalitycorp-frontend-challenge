import {Routes,Route} from 'react-router-dom'
import Home from "./routes/home/home";
import Navigation from './routes/navigationBar/navigation';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/shop/shop'
import Checkout from './routes/checkout/checkout';

import { useEffect } from 'react';
import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase';
import { setCurrentUser } from './store/user/user.action';
import {useDispatch} from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
        <Route path='checkout' element={<Checkout/>}/>
      </Route>  
    </Routes>
  );
};


export default App;
