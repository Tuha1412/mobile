import React, { useState, useEffect } from 'react';

function Cart(props) {


    const list = localStorage.getItem('mini_cart');
    const cart = JSON.parse(list);

    const [total, setTotal] = useState(0);


    const checkLogin = localStorage.getItem('isLogin') === 'true' ? (
        <a href="/checkout">Proceed to checkout</a>
        ) : (
        <a href="/login">Proceed to checkout</a>
    )

    const checkCart = cart.length > 0 ? (
        <form action="#">
            <div className="table-content table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="li-product-remove">remove</th>
                            <th className="li-product-thumbnail">images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="li-product-price">Unit Price</th>
                            <th className="li-product-quantity">Quantity</th>
                            <th className="li-product-subtotal">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart && cart.map((item, index) => (
                                <tr>
                                    <td className="li-product-remove"><a href=""><i className="fa fa-times" onClick={() => props.deleteCart(index)} /></a></td>
                                    <td className="li-product-thumbnail"><a href="#"><img src={`http://hieusuper20hcm.herokuapp.com/${item.image}`} alt="Li's Product Image" /></a></td>
                                    <td className="li-product-name"><a href="#">{item.name_product}</a></td>
                                    <td className="li-product-price"><span className="amount">{Number(item.price_product).toLocaleString()}</span></td>
                                    <td className="quantity">
                                        <div className="cart-plus-minus">
                                            <input id="quantity" className="cart-plus-minus-box" defaultValue={item.count} min="1" max="10" type="number" />
                                        </div>
                                    </td>
                                    <td className="product-subtotal"><span className="amount">{(Number(item.price_product) * parseInt(item.count)).toLocaleString()}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-md-5 ml-auto">
                    <div className="cart-page-total">
                        <h2>Cart totals</h2>
                        <ul>
                            <li>Total <span>{total.toLocaleString()}</span></li>
                        </ul>
                        {checkLogin}
                    </div>
                </div>
            </div>
        </form>
    ) : (
        <div className="empty-cart">Chua co san pham trong gio hang</div>
    )



    useEffect(() => {

        let total_price = 0;

        cart.map(value => {
            return total_price += parseInt(value.price_product) * parseInt(value.count);
        })

        setTotal(total_price);

    }, [])

    // const test = (value) => {
    //     console.log(value)
    // }

    return (
        <div>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {
                                checkCart
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Cart;