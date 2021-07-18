import React from 'react';
import {Link} from 'react-router-dom';
function Wishlist(props) {


    console.log(props);
    const {removeToWishlist, addCartWishlist} = props;
    const list = JSON.parse(localStorage.getItem('wishlist'));


    const showList = list && list.length > 0 ? (
        <form action="#">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-remove">remove</th>
                            <th className="li-product-thumbnail">images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="li-product-price">Unit Price</th>
                            <th className="li-product-stock-status">Stock Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list && list.map((item, index) => (
                                <tr>
                                    <td className="li-product-remove"><a href="" onClick={() => removeToWishlist(index)}><i className="fa fa-times" /></a></td>
                                    <td className="li-product-thumbnail"><Link to={`/detail/${item._id}`}><img src={`http://hieusuper20hcm.herokuapp.com/${item.image}`} alt="Li's Product Image" /></Link></td>
                                    <td className="li-product-name"><Link to={`/detail/${item._id}`}>{item.name_product}</Link></td>
                                    <td className="li-product-price"><span className="amount">{item.price_product.toLocaleString()} VND</span></td>
                                    <td className="li-product-stock-status"><span className="in-stock">in stock</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co san pham yeu thich</div>
    )

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Wishlist</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Li's Breadcrumb Area End Here */}
            {/*Wishlist Area Strat*/}
            <div className="wishlist-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                showList
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;