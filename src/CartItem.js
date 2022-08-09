const CartItem = (props) => {
    const { price, title, qty } = props.product;
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct } = props;
    return (
        <div className="cart-item">
            <div className="left-block">
                <img style={styles.image} src={product.img}/>
            </div>
            <div className="right-block">
                <div style={{ fontSize: 30 }} >{title}</div>
                <div>Rs {price}</div>
                <div>Qty: {qty}</div>
                <div className="cart-item-actions">
                    {/* Button */}
                    <img alt="increase"
                        className="action-icons"
                        src="https://img.icons8.com/pastel-glyph/344/plus--v1.png"
                        onClick={() => onIncreaseQuantity(product)} />
                    <img alt="decrease"
                        className="action-icons"
                        src="https://img.icons8.com/pastel-glyph/344/minus--v1.png"
                        onClick={() => onDecreaseQuantity(product)} />
                    <img alt="delete"
                        className="action-icons"
                        src="https://img.icons8.com/ios/344/delete-forever--v1.png"
                        onClick={() => onDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    )
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;