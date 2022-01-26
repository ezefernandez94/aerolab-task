import React, { Component } from 'react'

import "./Header.css";
import logo from "./assets/Combined Shape.png";
import cart from "./assets/shopping-cart.png";

class Header extends Component {

    constructor( props ){
        super( props );
        this.state = {
            
        }
    }

    render(){
        
        return(
            <div className='header'>
                <div className='logo-and-name'>
                    <img className='header-logo' src={logo} alt='Ezshop'/>
                    <span className='header-brand'><b>Ez</b>shop</span>
                </div>
                <div className='cart-and-value'>
                    <span className='header-cart-price'>${this.props.price}</span>
                    <img className='header-cart' src={cart} alt='Carrito'/>
                    <p className='header-cart-amount'>{this.props.amount}</p>
                </div>
            </div>
        )

    }

}

export default Header;