import React from 'react';
import {Link} from 'react-router-dom';
import { store } from 'react-notifications-component';

export const Product = ({product, addToWishlist, messages }) => {

    let user = {
        fullname: ''
    };

    if (JSON.parse(localStorage.getItem('userLocal'))) {
        user = JSON.parse(localStorage.getItem('userLocal'));
    }

    const onClick = (item, messages) => {
        
        addToWishlist(item, messages);

        const message = {
            title: `Chào ${user.fullname} !`,
            message: messages,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeInRight"],
            animationOut: ["animate__animated", "animate__fadeOutRight"],
            dismiss: {
                duration: 5000,
                onScreen: true
            },
            showIcon: true,
        }

        store.addNotification(message);
    }

    return (
        <div className="col">
            {
                product && product.map(item => (
                    <div className="row product-layout-list" key={item._id}>
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
                                    <div className="product-review">
                                        <h5 className="manufacturer">
                                            <a href="product-details.html">{item.nsx}</a>
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
                                    </div>
                                    <h4><Link className="product_name" to={`/detail/${item._id}`}>{item.name_product}</Link></h4>
                                    <div className="price-box">
                                        <span className="new-price">{item.price_product.toLocaleString()} VND</span>
                                    </div>
                                    <p>{item.describe}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="shop-add-action mb-xs-30">
                                <ul className="add-actions-link">
                                    <li className="add-cart">
                                        <Link to={`/detail/${item._id}`}>
                                            See details
                                        </Link>
                                    </li>
                                    <li className="wishlist"><span onClick={() => onClick(item, messages)}><i className="fa fa-heart-o" />Add to wishlist</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Product;