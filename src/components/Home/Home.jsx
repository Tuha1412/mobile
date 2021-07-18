import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home(props) {


    const products = useSelector(state => state);
    const arrProduct = products.Products.products;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: true,
    };

    const settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: true,
    };

    const slick = arrProduct && arrProduct.map(item =>
        <div className="col-lg-12">
            {/* single-product-wrap start */}
            <div className="single-product-wrap">
                <div className="product-image">
                    <Link to={`/detail/${item._id}`}>
                        <img src={`http://hieusuper20hcm.herokuapp.com/${item.image}`} alt="Li's Product Image" />
                    </Link>
                    <span className="sticker">New</span>
                </div>
                <div className="product_desc">
                    <div className="product_desc_info">
                        {/* <div className="product-review">
                            <h5 className="manufacturer">
                                <a href="shop-left-sidebar.html">Graphic Corner</a>
                            </h5>
                            <div className="rating-box">
                                <ul className="rating">
                                    <li><i className="fa fa-star-o" /></li>
                                    <li><i className="fa fa-star-o" /></li>
                                    <li><i className="fa fa-star-o" /></li>
                                    <li className="no-star"><i className="fa fa-star-o" /></li>
                                    <li className="no-star"><i className="fa fa-star-o" /></li>
                                </ul>
                            </div>
                        </div> */}
                        <h4><Link className="product_name" to={`/detail/${item._id}`}>{item.name_product}</Link></h4>
                        <div className="price-box">
                            <span className="new-price">{item.price_product.toLocaleString()} VND</span>
                        </div>
                    </div>
                    <div className="add-actions">
                        <ul className="add-actions-link">
                            <li className="add-cart active"><Link to={`/detail/${item._id}`}>See details</Link></li>
                            <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* single-product-wrap end */}
        </div>
    )


    return (
        <div>
            {/* Begin Li's Static Banner Area */}
            <div className="li-static-banner">
                <div className="container">
                    <div className="row">
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center">
                            <div className="single-banner single-banner-width">
                                <a href="#">
                                    <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2019/11/Report-from-Korea-says-to-expect-2.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner single-banner-width">
                                <a href="#">
                                    <img src="https://kenh14cdn.com/thumb_w/660/203336854389633024/2020/12/5/samsung-galaxy-fold-2-3-16071875364861929166630.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner single-banner-width">
                                <a href="#">
                                    <img src="https://photo.techrum.vn/images/2021/03/17/2fa29cef-iphone-12-profd100b44c00440cf.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                    </div>
                </div>
            </div>
            {/* Li's Static Banner Area End Here */}
            {/* Begin Li's Static Home Area */}
            <div className="li-static-home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Begin Li's Static Home Image Area */}
                            <div className="li-static-home-image" />
                            {/* Li's Static Home Image Area End Here */}
                            {/* Begin Li's Static Home Content Area */}
                            <div className="li-static-home-content">
                                <p>Giảm tận<span> 40% </span>đến hết tuần này</p>
                                <h2>Featured Product</h2>
                                <h2>Meito Accessories 2018</h2>
                                <p className="schedule">
                                    Starting at
                                    <span> $1209.00</span>
                                </p>
                                <div className="default-btn">
                                    <a href="/coupon" className="links">Khám phá ngay</a>
                                </div>
                            </div>
                            {/* Li's Static Home Content Area End Here */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Li's Static Home Area End Here */}
            {/* Begin Li's Trending Product Area */}
            <section className="product-area li-trending-product pt-60 pb-45">
                <div className="container">
                    <div className="row">
                        {/* Begin Li's Tab Menu Area */}
                        <div className="col-lg-12">
                            <div className="li-product-tab li-trending-product-tab">
                                <h2>
                                    <span>Trendding Products</span>
                                </h2>
                            </div>
                            {/* Begin Li's Tab Menu Content Area */}
                            <div className="tab-content li-tab-content li-trending-product-content">
                                <div id="home1" className="tab-pane show fade in active">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Slider {...settings}>
                                                {
                                                    slick
                                                }
                                            </Slider>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* Tab Menu Content Area End Here */}
                        </div>
                        {/* Tab Menu Area End Here */}
                    </div>
                </div>
            </section>
            {/* Li's Trending Product Area End Here */}
            {/* Begin Li's Trendding Products Area */}
            <section className="product-area li-laptop-product li-trendding-products best-sellers pb-45">
                <div className="container">
                    <div className="row">
                        {/* Begin Li's Section Area */}
                        <div className="col-lg-12">
                            <div className="li-section-title">
                                <h2>
                                    <span>Best sellers</span>
                                </h2>
                            </div>
                            <div className="tab-content li-tab-content li-trending-product-content">
                                <div id="home1" className="tab-pane show fade in active">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Slider {...settings2}>
                                                {
                                                    slick
                                                }
                                            </Slider>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Li's Section Area End Here */}
                    </div>
                </div>
            </section>
            {/* Li's Trendding Products Area End Here */}
        </div>
    );
}

export default Home;