import './Card.css'
import React, { Component } from 'react';

class Card extends Component{

    constructor( props ){
        super( props );
        this.state = {
            amount: 0,
            totalPrice: 0,
            dollarPrice: 0
        }
    }

    addToCart = (e) => {
        this.setState({
            amount: this.state.amount + 1,
            totalPrice: this.state.totalPrice + this.props.price
        });
        this.props.onItemChange(1, this.props.price);
    }

    drawFromCart = (e) => {
        if( this.state.amount !== 0 ){
            this.setState({
                amount: this.state.amount - 1,
                totalPrice: this.state.totalPrice - this.props.price
            });
        } else {
            alert('No hay elementos en el carrito');
        }
        this.props.onItemChange(0, this.props.price);
    }

    render(){
        if(this.state.amount === 0){
            return(
                <div className='card'>
                    <div className='card-content'>
                        <img className='card-image' src={this.props.img} alt={this.props.name}/>
                        <div className='card-title'>{this.props.name}</div>
                        <div className='card-description'>${this.props.price} (U$D {(this.props.price / this.props.dolar).toFixed(2)})</div>
                        <button className='card-button' onClick={this.addToCart}>Agregar al Carrito</button>
                    </div>
                </div>
            );
        } else {
            return(
                <div className='card'>
                    <div className='card-content'>
                        <img className='card-image' src={this.props.img} alt={this.props.name}/>
                        <div className='card-title'>{this.props.name}</div>
                        <div className='card-description'>${this.props.price} (U$D {(this.props.price / this.props.dolar).toFixed(2)})</div>
                        <div className='card-amount'>
                            <button className='card-minus-button' onClick={this.drawFromCart}>-</button>
                            <span className='card-product-amount'>{this.state.amount}</span>
                            <button className='card-plus-button' onClick={this.addToCart}>+</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

};

export default Card;