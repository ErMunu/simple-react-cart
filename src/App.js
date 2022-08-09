import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        onSnapshot(
            collection(
                getFirestore(),
                'products'
            ),
            (snapshot) => {
                const products = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    data['id'] = doc.id;
                    return data;
                })

                this.setState({
                    products,
                    loading: false
                })
            }
        );
    }

    handleIncreaseQuantity = (product) => {
        const { products } = this.state;
        const index = products.indexOf(product);

        updateDoc(
            doc(
                getFirestore(),
                'products',
                products[index].id
            ), {
            qty: ++products[index].qty
        }).catch(
            (err) => {
                console.log(err);
            })
    }

    handleDecreaseQuantity = (product) => {
        const { products } = this.state;
        const index = products.indexOf(product);

        if (products[index].qty === 0) {
            return;
        }

        updateDoc(
            doc(
                getFirestore(),
                'products',
                products[index].id
            ), {
            qty: --products[index].qty
        }).catch(
            (err) => {
                console.log(err);
            })
    }

    handleDeleteProduct = (id) => {
        deleteDoc(
            doc(
                getFirestore(),
                'products',
                id
            )
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    getCartCount = () => {
        const { products } = this.state;
        let count = 0;

        products.forEach(
            (product) => {
                count += product.qty;
            }
        )

        return count;
    }

    getCartTotal = () => {
        const { products } = this.state;
        let total = 0;

        products.forEach(
            (product) => {
                total += product.price * product.qty;
            }
        )

        return total;
    }

    addProduct = () => {
        setDoc(
            doc(
                getFirestore(),
                'products',
                '452584568'
            ), {
                img: '',
                price: 10254,
                qty: 5,
                title: 'Washing Machine'
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    render() {
        const { products, loading } = this.state;
        return (
            <div className="App">
                <Navbar count={this.getCartCount()} />
                <button onClick={this.addProduct} style={{ padding: 20 }} >Add New Product</button>
                <Cart
                    products={products}
                    onIncreaseQuantity={this.handleIncreaseQuantity}
                    onDecreaseQuantity={this.handleDecreaseQuantity}
                    onDeleteProduct={this.handleDeleteProduct}
                />
                {loading && <h1>Loading...</h1>}
                <div style={{ padding: 20, fontSize: 30, textAlign: 'right' }}>
                    Total: {this.getCartTotal()}
                </div>
            </div>
        );
    }
}


export default App;
