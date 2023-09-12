import { useState,useEffect,Fragment } from "react";
import { useParams } from "react-router-dom";
import './category.scss'

import ProductCard from "../productCard/productCard";
import {useSelector} from 'react-redux';
import { selectCategoriesMap } from "../../store/categories/category.select";

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products,setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return(
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category;