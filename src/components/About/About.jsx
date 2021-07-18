import React from 'react';
import PropTypes from 'prop-types';
import '../../css/style.css';
import '../../css/responsive.css';
About.propTypes = {

};

function About(props) {
    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/* about wrapper start */}
            <div className="about-us-wrapper pt-60 pb-40">
                <div className="container">
                    <div className="row">
                        {/* About Text Start */}
                        <div className="col-lg-6 order-last order-lg-first">
                            <div className="about-text-wrap">
                                <h2><span>Provide Best</span>Product For You</h2>
                                <p>We provide the best Beard oile all over the world. We are the worldd best store in indi for Beard Oil. You can buy our product without any hegitation because they truste us and buy our product without any hagitation because they belive and always happy buy our product.</p>
                                <p>Some of our customer say’s that they trust us and buy our product without any hagitation because they belive us and always happy to buy our product.</p>
                                <p>We provide the beshat they trusted us and buy our product without any hagitation because they belive us and always happy to buy.</p>
                            </div>
                        </div>
                        {/* About Text End */}
                        {/* About Image Start */}
                        <div className="col-lg-5 col-md-10">
                            <div className="about-image-wrap">
                                <img className="img-full" src="images/product/large-size/13.jpg" alt="About Us" />
                            </div>
                        </div>
                        {/* About Image End */}
                    </div>
                </div>
            </div>
            {/* about wrapper end */}
            {/* Begin Counterup Area */}
            <div className="counterup-area">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-3 col-md-6">
                            {/* Begin Limupa Counter Area */}
                            <div className="limupa-counter white-smoke-bg">
                                <div className="container">
                                    <div className="counter-img">
                                        <img src="images/about-us/icon/1.png" alt="" />
                                    </div>
                                    <div className="counter-info">
                                        <div className="counter-number">
                                            <h3 className="counter">2169</h3>
                                        </div>
                                        <div className="counter-text">
                                            <span>HAPPY CUSTOMERS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* limupa Counter Area End Here */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Begin limupa Counter Area */}
                            <div className="limupa-counter gray-bg">
                                <div className="counter-img">
                                    <img src="images/about-us/icon/2.png" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-number">
                                        <h3 className="counter">869</h3>
                                    </div>
                                    <div className="counter-text">
                                        <span>AWARDS WINNED</span>
                                    </div>
                                </div>
                            </div>
                            {/* limupa Counter Area End Here */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Begin limupa Counter Area */}
                            <div className="limupa-counter white-smoke-bg">
                                <div className="counter-img">
                                    <img src="images/about-us/icon/3.png" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-number">
                                        <h3 className="counter">689</h3>
                                    </div>
                                    <div className="counter-text">
                                        <span>HOURS WORKED</span>
                                    </div>
                                </div>
                            </div>
                            {/* limupa Counter Area End Here */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Begin limupa Counter Area */}
                            <div className="limupa-counter gray-bg">
                                <div className="counter-img">
                                    <img src="images/about-us/icon/4.png" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-number">
                                        <h3 className="counter">2169</h3>
                                    </div>
                                    <div className="counter-text">
                                        <span>COMPLETE PROJECTS</span>
                                    </div>
                                </div>
                            </div>
                            {/* limupa Counter Area End Here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;