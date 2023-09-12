import {Routes,Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import './shop.scss'
import Category from '../../components/category/category';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase';

import { setCategoriesMap } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments('categories');
        dispatch(setCategoriesMap(categoryMap));
        };

        getCategoriesMap();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
    
};
  
  export default Shop;