import React from 'react';
import PropTypes from 'prop-types';
import '../../css/style.css';
import '../../css/responsive.css';
import '../../css/helper.css';
import img1 from '../../images/shipping-icon/1.png';
import img2 from '../../images/shipping-icon/2.png';
import img3 from '../../images/shipping-icon/3.png';
import img4 from '../../images/shipping-icon/4.png';
import logo from '../../images/menu/logo/1.jpg';

Footer.propTypes = {

};

function Footer(props) {
    return (
        <div className="footer">
            {/* Begin Footer Static Top Area */}
            <div className="footer-static-top">
                <div className="container">
                    {/* Begin Footer Shipping Area */}
                    <div className="footer-shipping pt-60 pb-55 pb-xs-25">
                        <div className="row">
                            {/* Begin Li's Shipping Inner Box Area */}
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={img1} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Free Delivery</h2>
                                        <p>And free returns. See checkout for delivery dates.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Li's Shipping Inner Box Area End Here */}
                            {/* Begin Li's Shipping Inner Box Area */}
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={img2} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Safe Payment</h2>
                                        <p>Pay with the world's most popular and secure payment methods.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Li's Shipping Inner Box Area End Here */}
                            {/* Begin Li's Shipping Inner Box Area */}
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={img3} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Shop with Confidence</h2>
                                        <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Li's Shipping Inner Box Area End Here */}
                            {/* Begin Li's Shipping Inner Box Area */}
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={img4} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>24/7 Help Center</h2>
                                        <p>Have a question? Call a Specialist or chat online.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Li's Shipping Inner Box Area End Here */}
                        </div>
                    </div>
                    {/* Footer Shipping Area End Here */}
                </div>
            </div>
            {/* Footer Static Top Area End Here */}
            {/* Begin Footer Static Middle Area */}
            <div className="footer-static-middle">
                <div className="container">
                    <div className="footer-logo-wrap pt-50 pb-35">
                        <div className="row">
                            {/* Begin Footer Logo Area */}
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-logo">
                                    <img src={logo} alt="Footer Logo" />
                                    <p className="info">
                                        We are a team of designers and developers that create high quality HTML Template &amp; Woocommerce, Shopify Theme.
                    </p>
                                </div>
                                <ul className="des">
                                    <li>
                                        <span>Address: </span>
                      6688Princess Road, London, Greater London BAS 23JK, UK
                    </li>
                                    <li>
                                        <span>Phone: </span>
                                        <a href="#">(+123) 123 321 345</a>
                                    </li>
                                    <li>
                                        <span>Email: </span>
                                        <a href="mailto://info@yourdomain.com">info@yourdomain.com</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Footer Logo Area End Here */}
                            {/* Begin Footer Block Area */}
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <div className="footer-block">
                                    <h3 className="footer-block-title">Product</h3>
                                    <ul>
                                        <li><a href="#">Prices drop</a></li>
                                        <li><a href="#">New products</a></li>
                                        <li><a href="#">Best sales</a></li>
                                        <li><a href="#">Contact us</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Footer Block Area End Here */}
                            {/* Begin Footer Block Area */}
                            <div className="col-lg-2 col-md-3 col-sm-6">
                                <div className="footer-block">
                                    <h3 className="footer-block-title">Our company</h3>
                                    <ul>
                                        <li><a href="#">Delivery</a></li>
                                        <li><a href="#">Legal Notice</a></li>
                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Contact us</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Footer Block Area End Here */}
                            {/* Begin Footer Block Area */}
                            <div className="col-lg-4">
                                <div className="footer-block">
                                    <h3 className="footer-block-title">Follow Us</h3>
                                    <ul className="social-link">
                                        <li className="twitter">
                                            <a href="https://twitter.com/" data-toggle="tooltip" target="_blank" title="Twitter">
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                        <li className="rss">
                                            <a href="https://rss.com/" data-toggle="tooltip" target="_blank" title="RSS">
                                                <i className="fa fa-rss" />
                                            </a>
                                        </li>
                                        <li className="google-plus">
                                            <a href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title="Google Plus">
                                                <i className="fa fa-google-plus" />
                                            </a>
                                        </li>
                                        <li className="facebook">
                                            <a href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title="Facebook">
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li className="youtube">
                                            <a href="https://www.youtube.com/" data-toggle="tooltip" target="_blank" title="Youtube">
                                                <i className="fa fa-youtube" />
                                            </a>
                                        </li>
                                        <li className="instagram">
                                            <a href="https://www.instagram.com/" data-toggle="tooltip" target="_blank" title="Instagram">
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Begin Footer Newsletter Area */}
                                <div className="footer-newsletter">
                                    <h4>Sign up to newsletter</h4>
                                    <form action="#" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" target="_blank" noValidate>
                                        <div id="mc_embed_signup_scroll">
                                            <div id="mc-form" className="mc-form subscribe-form form-group">
                                                <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                                                <button className="btn" id="mc-submit">Subscribe</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* Footer Newsletter Area End Here */}
                            </div>
                            {/* Footer Block Area End Here */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Static Middle Area End Here */}
        </div>
    );
}

export default Footer;