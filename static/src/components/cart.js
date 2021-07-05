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
     * @param $image
     * @param $store
     */
    this.add_item = function ($name, $price, $image, $store) {
        self._cart[generateID()] = {
            name: $name,
            price: parseFloat($price),
            image: $image,
            store: $store
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

    /**
     * Group similar items by name.
     *
     * @private
     * @return item dict
     */
    this._group_items = function () {
        let $items = {};
        let $k = Object.keys(self._cart);
        for (let $i = 0; $i < $k.length; $i++) {
            let $j = self._cart[$k[$i]]; // Get the item
            let $name = $j.name + '_' + $j.store;
            if (!$items.hasOwnProperty($name)) {
                let $img = $j.image;
                if (!File.isFileImageExtension($img)) $img = 'media/examples/caja.png';
                $items[$name] = {
                    'name': $j.name,
                    'quantity': 1,
                    'price': $j.price,
                    'store': $j.store,
                    'image': $img
                }
            } else {
                $items[$name].quantity += 1;
            }
        }
        return $items;
    };

    /**
     * Inits cart object.
     */
    this.cart_init = function () {
        let $c = self._group_items();
        let $k = Object.keys($c);
        let $cart_items_box = $('#cart-items');
        let $total = 0;
        let $items = 0;

        // Add items
        for (let $i = 0; $i < $k.length; $i++) {
            let $obj = $c[$k[$i]];
            let $t = $obj.price * $obj.quantity; // total pricew
            $cart_items_box.append(`
            <div class="cart-row">
                <div style="flex:2">
                    <p><img src="${$obj.image}" alt="" /><a href="http://127.0.0.1:8000/store/${$obj.store}">
                        ${$obj.name}</a></p>
                </div>
                <div style="flex:1"><p>${$obj.quantity}</p></div>
                <div style="flex:1"><p class="quantity">$${$t}</p></div>
            </div>`);
            $items += $obj.quantity;
            $total += $t;
        }

        // If empty
        if ($items === 0) {
            $cart_items_box.append('<div class="empty-item">El carrito está vacío <i class="fas fa-luggage-cart"></i></div>');
            $('#checkout_button').hide();
            $('#wipe_cart').hide();
        }

        // Change overall description
        $('#cart_total').html($items);
        $('#cart_value').html($total);
    };

}

/**
 * Creates the bazar cart object.
 * @type {BazarCart}
 */
let app_cart = new BazarCart();