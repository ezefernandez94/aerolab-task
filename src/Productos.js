import axios from 'axios';
import React, { Component } from 'react';

import './Producto.css'

import Card from './Card';
import Header from './Header';

class Productos extends Component {
  
    constructor( props ){
        super( props );
        this.state = {
            productos: [],
            pageCounter: 1,
            amount: 0,
            price: 0,
            getNewData: 0,
            dolar: 0
        }
        this.getMoreProducts=this.getMoreProducts.bind(this);
        this.updateItemAmount=this.updateItemAmount.bind(this);
    }

    updateItemAmount(actionType, price){
        if(actionType === 0){
            // hay que restar
            this.setState({
                amount: this.state.amount - 1,
                price: this.state.price - price
            });
        } else if(actionType === 1){
            // hay que sumar
            this.setState({
                amount: this.state.amount + 1,
                price: this.state.price + price
            });
        }
    }

    getMoreProducts(){
        if( this.state.pageCounter < 5 ){
            this.setState({
                pageCounter: this.state.pageCounter + 1,
                getNewData: 1
            });
        } else {
            alert('No hay más productos para mostrar');
        }
    }

    componentDidMount(){

        axios.get('https://challenge-api.aerolab.co/slow/products')
        .then(productsResponse => {
            if( productsResponse.status === 200 && productsResponse !== null ){
                console.log(productsResponse);
                axios.get('https://challenge-api.aerolab.co/dollar')
                .then(dolarResponse => {
                    if( dolarResponse.status === 200 && dolarResponse !== null ){
                        console.log(dolarResponse);
                        this.setState({
                            productos: productsResponse.data.products,
                            dolar: dolarResponse.data.rate
                        });
                    } else {
                        console.log("Warning: can't retrieve dollar data");
                    }
                })
                .catch(dolarError => {
                    console.log(dolarError);
                })
                
            } else {
                console.log("Warning: can't retrieve product data");
            }
        })
        .catch(productError => {
            console.log(productError);
        })
    }

    componentDidUpdate(){
        console.log('entre');
        if( this.state.getNewData === 1 ){
            axios.get(`https://challenge-api.aerolab.co/slow/products?page=${this.state.pageCounter}`)
            .then(response => {
                if( response.status === 200 && response !== null ){
                    console.log(response);
                    console.log(this.state.productos)
                    this.setState({
                        productos: this.state.productos.concat(response.data.products),
                        getNewData: 0
                    });
                } else {
                    console.log('Warning: problem encountered');
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    render(){
        if(this.state.pageCounter >= 5){
            return (
                <div className="Productos">
                    <Header amount={this.state.amount} price={this.state.price}/>
                    <div className='productos-inicial'>
                        <div className='almacen'>Almacen</div>
                        {this.state.productos.map((producto, index) =>
                            <Card name={producto.name} img={producto.photo} price={producto.price} dolar={this.state.dolar} onItemChange={this.updateItemAmount} key={index}/>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Productos">
                    <Header amount={this.state.amount} price={this.state.price}/>
                    <div className='productos-inicial'>
                        <div className='almacen'>Almacen</div>
                        {this.state.productos.map((producto, index) =>
                            <Card id={producto.id} name={producto.name} img={producto.photo} price={producto.price} dolar={this.state.dolar} onItemChange={this.updateItemAmount} key={index}/>
                        )}
                    </div>
                    <button className='mas-productos' onClick={this.getMoreProducts}>
                        Cargar más Productos
                    </button>
                </div>
            );
        }  
    }
  
}
  
export default Productos;