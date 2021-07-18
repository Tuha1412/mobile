import React, { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Detail from './components/Detail-product/Detail';
import About from './components/About/About';
import Cart from './containers/Cart';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Wishlist from './containers/Wishlist';
import History from './components/History/History';
import Products from './containers/Products';
import CartHeader from './containers/CartMini';
import Checkout from './components/Checkout/Checkout';
import Register from './components/Login/Register';
import DetailBill from './components/DetailBill/DetailBill';
import OrderSuccess from './components/OrderNoti/OrderSuccess';
import Coupon from './components/Coupon/Coupon';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProducts } from './reducers/productsReducer';
import axios from 'axios';

function App() {


    //lấy API
    const dispatch = useDispatch();
    const fetchProduct = async () => {
        const response = await axios.get('http://hieusuper20hcm.herokuapp.com/api/product').catch((err) => { console.log("Fetch API failed!! " + err); })
        //console.log(response);
        if (!response) return;
        dispatch(setProducts(response.data));
    }

    useEffect(() => {
        fetchProduct();
    }, []);
    
    return (
        <div>
            <BrowserRouter>
                <CartHeader />
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/about" component={About}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/wishlist" component={Wishlist}/>
                    <Route path="/listproduct" component={Products}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/history" component={History}/>
                    <Route path="/detailbill/:id" component={DetailBill}/>
                    <Route path="/ordersuccess" component={OrderSuccess}/>
                    <Route path="/coupon" component={Coupon}/>
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
