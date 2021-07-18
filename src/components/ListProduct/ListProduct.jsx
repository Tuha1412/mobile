import React, { useState, useEffect } from 'react';
import Product from './Product';
import Pagination from './Pagination';
import RingLoading from '../Loading/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../reducers/productsReducer';
import axios from 'axios';
import Notification from '../Notification/Notification';
import { FormControl, InputLabel, NativeSelect } from '@material-ui/core';

const ListProduct = (props) => {

    const { addToWishlist } = props;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);


    const dispatch = useDispatch();
    const fetchProduct = async () => {
        const response = await axios.get('http://hieusuper20hcm.herokuapp.com/api/product').catch((err) => { console.log("Fetch API failed!! " + err); })
        if (!response) return;
        //console.log(response.data);
        //dispatch(setProducts(response.data));
        setLoading(false);
        setProduct(response.data);
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    //producer
    const [producers, setProducers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState('');
    const [chooseProducer, setChooseProducer] = useState('All');  
    const fetchProducer = async () => {
        const response = await axios.get('https://hieusuper20hcm.herokuapp.com/api/admin/producer').catch((err) => { console.log("Fetch API failed!! " + err); })
        if (!response) return;
        //console.log(response);
        setProducers(response.data.producers);
    }
    
    useEffect(() => {
        fetchProducer();
    }, []);

    const onChangeProducer = (e) => {
        setLoading(true);
        setSelectedProducer(e.target.value.toLowerCase());
        setChooseProducer(e.target.value);
    }
    
    const fetchProductByProducer = async () => {
        const response = await axios.get(`https://hieusuper20hcm.herokuapp.com/api/admin/producer/detail/${selectedProducer}`).catch((err) => { console.log("Fetch API failed!! " + err); });
        console.log(response);
        //dispatch(setProducts(response.data));
        setLoading(false);
        setProduct(response.data.products);
    }

    useEffect(() => {
        if (selectedProducer !== '')
            fetchProductByProducer();
    }, [selectedProducer]);

    const messages = {
        addToWishlist: 'Bạn đã thêm sản phẩm vào danh sách yêu thích.',
    }


    //get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currenProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const loadProduct = loading ? (
        <div className="col">
            <div className="center">
                <RingLoading />
            </div>
        </div>
    ) : (

        <div className="col-lg-12 order-2 order-lg-1">
            {/* shop-top-bar start */}
            <div className="shop-top-bar mt-30">
                <div className="shop-bar-inner">
                    <div className="product-view-mode">
                        {/* shop-item-filter-list start */}
                        {/* shop-item-filter-list end */}
                    </div>

                </div>
                {/* product-select-box start */}
                <div className="product-select-box">
                    <div className="product-short">
                        <p>Producer:</p>
                        <select onChange={(e) => onChangeProducer(e)} className="nice-select">
                            <option value="all">All</option>
                            {
                                producers && producers.map(item => {
                                    return <option key={item._id} value={item.producers}>{item.producer}</option>
                                })  
                            }
                        </select>
                        {/* <FormControl>
                            <InputLabel htmlFor="country-selector" shrink>Producer</InputLabel>
                            <NativeSelect
                                    onChange={(e) => onChangeProducer(e)}
                                    inputProps={{
                                        name: 'country',
                                        id: 'country-selector'
                                    }}>
                                        {
                                            producers && producers.map((item) => {
                                                return  <option key={item._id} value={item.producers}>{item.producer}</option>
                                            })
                                        }
                            </NativeSelect>
                        </FormControl> */}
                    </div>
                </div>
                {/* product-select-box end */}
            </div>
            {/* shop-top-bar end */}
            {/* shop-products-wrapper start */}
            <div className="shop-products-wrapper">
                <div className="tab-content">
                    <div id="list-view" className="tab-pane fade product-list-view active show" role="tabpanel">
                        <div className="row">
                            <Product product={currenProducts} addToWishlist={addToWishlist} messages={messages.addToWishlist} />
                        </div>
                    </div>
                    <div className="paginatoin-area">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <Pagination productsPerPage={productsPerPage} totalProducts={product.length} paginate={paginate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* shop-products-wrapper end */}
        </div>

    )

    return (
        <div>
            <Notification />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Shop</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/* Begin Li's Content Wraper Area */}
            <div className="content-wraper pb-60">
                <div className="container">
                    <div className="row">
                        {loadProduct}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProduct;