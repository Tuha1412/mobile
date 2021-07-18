import React, { useState, useEffect } from 'react';
import '../../css/style.css';
import '../../css/responsive.css';
import '../../css/helper.css';
import '../../css/owl.carousel.min.css';
import '../../css/slick.css';
import '../../css/jquery-ui.min.css';
import '../../css/animate.css';
import '../../css/magnific-popup.css';
//import '../../css/material-design-iconic-font.min.css';
import '../../css/meanmenu.css';
import '../../css/nice-select.css';
import '../../css/venobox.css';
import logo from '../../images/menu/logo/1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../reducers/productsReducer';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Header(props) {


    const products = useSelector(state => state);
    const arrProduct = products.Products.products;

    //xử lí localStorage
    const list = localStorage.getItem('mini_cart');
    const wishlist = JSON.parse(localStorage.getItem('wishlist'));
    const cart = JSON.parse(list);
    const countWishlist = wishlist ? (wishlist.length) : (0);
    const countCart = cart ? (cart.length) : (0);

    const user = JSON.parse(localStorage.getItem('userLocal'));
    const checkFullname = user ? user.fullname : 'Setting';
    //tính tổng tiền giỏ hàng
    const total = cart && cart.reduce((object, item) => {
        let sum = parseInt(object + Number(item.price_product) * item.count);
        return parseFloat(sum);
    }, 0);

    const checkCart = cart && cart.length > 0 ? (
        <div className="minicart collapse" id="collapseCart">
            <ul className="minicart-product-list">
                {
                    cart && cart.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href="/detail" className="minicart-product-image">
                                    <img src={`http://hieusuper20hcm.herokuapp.com/${item.image}`} alt="cart products" />
                                </a>
                                <div className="minicart-product-details">
                                    <h6><a href="/detail">{item.name_product}</a></h6>
                                    <span>{Number(item.price_product).toLocaleString()} x <strong>{item.count}</strong></span>
                                </div>
                                <a href="">
                                    <button className="close" title="Remove" onClick={() => props.deleteCartMini(index)}>
                                        <i className="fa fa-close" />
                                    </button>
                                </a>
                            </li>
                        )
                    })

                }
            </ul>
            <p className="minicart-total">SUBTOTAL: <span>{total.toLocaleString()} VND</span></p>
            <div className="minicart-button">
                <a href="/cart" className="li-button li-button-fullwidth li-button-dark">
                    <span>View Full Cart</span>
                </a>
            </div>
        </div>
    ) : (
        <div className="minicart collapse" id="collapseCart">
            <h2>Chua co san pham trong gio hang</h2>
        </div>
    )


    const logout = () => {
        localStorage.setItem('isLogin', false);
        localStorage.removeItem('userLocal');
    }

    const checkLogin = localStorage.getItem('isLogin') === 'true' ? (
        <ul className="ht-setting-list">
            <li><a href="/history">History</a></li>
            <li><a href="/login" onClick={() => logout()}>Log Out</a></li>
        </ul>
    ) : (
        <ul className="ht-setting-list">
            <li><a href="/login">Sign In</a></li>
        </ul>
    );


    let [resultSearch, setResultSearch] = useState([]);
    const onChange = (e) => {
        let result;
        if (e.target.value !== '') {
            result = arrProduct && arrProduct.filter((item) => {
                return item.name_product.toLowerCase().indexOf(e.target.value) !== -1;
            })
        }
        setResultSearch(result);

    }


    return (
        <header>
            {/* Begin Header Top Area */}
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        {/* Begin Header Top Left Area */}
                        <div className="col-lg-3 col-md-4">
                            <div className="header-top-left">
                                <ul className="phone-wrap">
                                    <li><span>Telephone Enquiry: </span><a href="#">0332362979</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* Header Top Left Area End Here */}
                        {/* Begin Header Top Right Area */}
                        <div className="col-lg-9 col-md-8">
                            <div className="header-top-right">
                                <ul className="ht-menu">
                                    {/* Begin Setting Area */}
                                    <li>
                                        <div className="ht-setting-trigger" data-toggle="collapse" href="#collapesetting" role="button" aria-expanded="false" aria-controls="collapesetting"><span>{checkFullname}</span></div>
                                        <div className="setting ht-setting" id="collapesetting">
                                            {checkLogin}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Header Top Right Area End Here */}
                    </div>
                </div>
            </div>
            {/* Header Top Area End Here */}
            {/* Begin Header Middle Area */}
            <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                <div className="container">
                    <div className="row">
                        {/* Begin Header Logo Area */}
                        <div className="col-lg-3">
                            <div className="logo pb-sm-30 pb-xs-30">
                                <a href="/home">
                                    <img src={logo} alt="" />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo Area End Here */}
                        {/* Begin Header Middle Right Area */}
                        <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15 search-rela">
                            {/* Begin Header Middle Searchbox Area */}
                            <form action="#" className="hm-searchbox">
                                <input type="text" onChange={(e) => onChange(e)} placeholder="Enter your search key ..." />
                                <button className="li-btn" type="submit"><i className="fa fa-search" /></button>
                            </form>
                            <div className="search-result">
                                <ul>
                                    {
                                        resultSearch && resultSearch.map((item) => (
                                            <li>
                                                <div className="row product-layout-list">
                                                    <div className="col-lg-3 col-md-5 ">
                                                        <div className="product-image">
                                                            <Link to={`/detail/${item._id}`}>
                                                                <img src={`http://hieusuper20hcm.herokuapp.com/${item.image}`} alt="Li's Product Image" />
                                                            </Link>
                                                            <span className="sticker">New</span>    
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-7">
                                                        <div className="product_desc">
                                                            <div className="product_desc_info">
                                                                <h4><Link className="product_name" to={`/detail/${item._id}`}>{item.name_product}</Link></h4>
                                                                <div className="price-box">
                                                                    <span className="new-price">{item.price_product.toLocaleString()} VND</span>
                                                                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {/* Header Middle Searchbox Area End Here */}
                            {/* Begin Header Middle Right Area */}
                            <div className="header-middle-right">
                                <ul className="hm-menu">
                                    {/* Begin Header Middle Wishlist Area */}
                                    <li className="hm-wishlist">
                                        <a href="/wishlist">
                                            <span className="cart-item-count wishlist-item-count">{countWishlist}</span>
                                            <i className="fa fa-heart-o" />
                                        </a>
                                    </li>
                                    {/* Header Middle Wishlist Area End Here */}
                                    {/* Begin Header Mini Cart Area */}
                                    <li className="hm-minicart" >
                                        <div className="hm-minicart-trigger collapsed" data-toggle="collapse" data-target="#collapseCart" aria-expanded="false" aria-controls="collapseCart" role="button">
                                            <span className="item-icon" />
                                            <span className="item-text">{total.toLocaleString()}
                                                <span className="cart-item-count">{countCart}</span>
                                            </span>
                                        </div>
                                        {checkCart}
                                    </li>
                                    {/* Header Mini Cart Area End Here */}
                                </ul>
                            </div>
                            {/* Header Middle Right Area End Here */}
                        </div>
                        {/* Header Middle Right Area End Here */}
                    </div>
                </div>
            </div>
            {/* Header Middle Area End Here */}
            {/* Begin Header Bottom Area */}
            <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Begin Header Bottom Menu Area */}
                            <div className="hb-menu">
                                <nav>
                                    <ul>
                                        <li className="dropdown-holder"><span><a href="/home">Home</a></span></li>
                                        <li className="megamenu-holder"><span><a href="/listproduct">Shop</a></span></li>
                                        <li><span><a href="/about">About Us</a></span></li>
                                        <li><span><a href="/contact">Contact</a></span></li>
                                    </ul>
                                </nav>
                            </div>
                            {/* Header Bottom Menu Area End Here */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Header Bottom Area End Here */}
            {/* Begin Mobile Menu Area */}
            <div className="mobile-menu-area d-lg-none d-xl-none col-12">
                <div className="container">
                    <div className="row">
                        <div className="mobile-menu">
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu Area End Here */}
        </header>
    );
}

export default Header;