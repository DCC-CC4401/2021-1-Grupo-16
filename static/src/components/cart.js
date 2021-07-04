/**
 * Implements a simple cart for adding objects.
 */

function BazarCart() {

    this._cart = {};

    /**
     * Stores cart reference
     * @type {BazarCart}
     */
    let self = this;

    this.load = function () {
        let $cart = app_session.getData('cart', '{}', 'cart.data');
        self._cart = JSON.parse($cart);
        self._update_header();
    };

    /**
     * Adds an item to the cart
     * @param $name
     * @param $price
     */
    this.add_item = function ($name, $price) {
        self._cart[generateID()] = {
            name: $name,
            price: parseFloat($price)
        }
        self._update_header();
    };

    /**
     * Return the total number of elements within the cart.
     *
     * @returns {number}
     */
    this.total = function () {
        return Object.keys(self._cart).length;
    };

    /**
     * Updates the header total elements in cart.
     */
    this._update_header = function () {
        let $obj = $('#header-tool-container .notification');
        if (self.total() === 0) {
            $obj.hide();
        } else {
            $obj.show();
            $obj.html('<span class="badge">{0}</span>'.format(self.total()));
        }
    };

    /**
     * Save cart to cookies.
     */
    this.save = function () {
        app_session.setData('cart', JSON.stringify(self._cart), 'cart.data');
    };

    /**
     * Clear the cart.
     */
    this.clear = function () {
        self._cart = {};
        self.save();
    };

}

/**
 * Creates the bazar cart object.
 * @type {BazarCart}
 */
let app_cart = new BazarCart();