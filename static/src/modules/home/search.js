/**
 SEARCH
 Home search.
 */
"use strict";

/**
 * Search component.
 *
 * @constructor
 */
function HomeModuleSearchComponent() {

    /**
     * Stores the pointer
     * @type {HomeModuleSearchComponent}
     */
    let self = this;

    /**
     * Stores the search input item
     * @type {jQuery}
     * @private
     */
    this._search_input = null;

    /**
     * Box that contains the search tools
     * @type {*|jQuery}
     * @private
     */
    this._search_box = null;

    /**
     * Box that contains the results cards
     * @type {*|jQuery}
     * @private
     */
    this._results_box = null;

    // noinspection JSUnusedGlobalSymbols
    /**
     * Contents height
     * @type {number}
     * @private
     */
    this._contents_initial_height = 0;

    /**
     * Input hover color if user has the context.
     *
     * @private
     */
    this._setInputHoverBgColor = function () {
        let $search_box = $('#search-input-box');
        self._search_input.on('focus', () => {
            $search_box.addClass('search-input-focus');
            $search_box.removeClass('search-input-blur');
            // self._search_box.transition({x: 0, y: -self._contents_initial_height * 0.05}, 300);
        });
        self._search_input.on('blur', () => {
            $search_box.addClass('search-input-blur');
            $search_box.removeClass('search-input-focus');
            self._search_box.transition({x: 0, y: 0});
        });
    };

    /**
     * Appends a result of the search query.
     *
     * @param {string} $title - Card title
     * @param {string} $img - Card image
     * @param {string} $stars - Card stars
     * @param {string} $region - Card region
     * @param {string} $other - Other description
     * @param {string} $description - Card description
     */
    this.appendResultStoreCard = function ($title, $img, $stars,
                                           $region, $other, $description) {

        // Create random ID
        let $id = generateID();

        let $html = `
        <div class="results-card-box hvr-grow" id="${$id}">
            <div class="results-card-stars"><i class="fas fa-star"></i> ${$stars} / 5</div>
            <div class="results-card-region">${$region}</div>
            <div class="results-card-other">${$other}</div>
            <div class="results-card-title">${$title}</div>
            <div class="results-card-description">${$description}</div>
        </div>
        `;

        self._results_box.append($html);

        // Get the jQuery object
        let $box = $('#{0}'.format($id));
        $box.css('background-image', 'url({0}),linear-gradient(45deg,#000000,#00000000)'.format($img));

        $box.on('mouseover.ToggleBottomDescription', function () {
            if ($box.attr('over') === 'true') return;
            $box.attr('over', 'true');
            $box.find('.results-card-description').fadeTo(50, 1);
            $box.find('.results-card-title').transition({x: 0, y: -convertRemToPixels(2)}, 300);
        });
        $box.on('mouseleave.ToggleBottomDescription', function () {
            if ($box.attr('over') === 'false') return;
            $box.attr('over', 'false');
            $box.find('.results-card-description').fadeTo(200, 0);
            $box.find('.results-card-title').transition({x: 0, y: 0}, 100);
        });

    };

    /**
     * Creates a random store card example.
     *
     * @private
     */
    this._createRandomStoreCard = function () {
        let $title = ['LegoChile', 'Puma', 'Reifshnaider Store', 'Sony Chile', 'SuperMegaDeliciososHelados',
            'MercadoLibros', 'Teteras Juana', 'Peluches Pipo', 'Llantas Manuel'];
        let $regions = ['RM, La Florida', 'Linares', 'Arica y Parinacota'];
        let $img = [
            'http://127.0.0.1:8000/static/media/examples/example-1.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-2.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-3.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-4.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-5.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-6.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-7.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-8.jpg',
            'http://127.0.0.1:8000/static/media/examples/example-9.jpg'
        ];
        let $stars = [1, 2, 3, 4, 5];
        let $description = [
            'Ricas empanadas de pollo revueltas en jamon y queso', // 50
            'Librería de libros de papel impresos en tinta con tamaños similares en todo Chile muy barato compre compre rápido', // 113
            'Tienda de ropa y diseño de última generación @tiendaChileBonitoYElegante en Chile y todo el mundo compre rápido y ahora o perderá la oferta.' // 140 ]
        ];
        let $other = '{0} productos'.format(Math.getRandomInt(40, 10000));
        self.appendResultStoreCard(
            $title.randomElement(),
            $img.randomElement(),
            $stars.randomElement(),
            $regions.randomElement(),
            $other,
            $description.randomElement()
        )
    };

    /**
     * Init the search box.
     *
     * @param {number} $contents_height - Height content object
     */
    this.init = function ($contents_height) {

        // Store the contents height
        self._contents_initial_height = $contents_height;

        // Store basic DOM objectss
        self._search_box = $('#search-box');
        self._search_input = $('#search-input-text');
        self._results_box = $('#search-results');

        // Update box margin
        self._search_box.css('margin-top', $contents_height * 0.1);
        // self._results_box.css({
        //     'margin-bottom': -$contents_height * 0.7,
        //     'top': -$contents_height * 0.7
        // });

        // Set hover event
        self._setInputHoverBgColor();

        // Clone the first card result
        for (let $i = 0; $i < 50; $i++) {
            self._createRandomStoreCard();
        }

        // Colorize last queries
        $('#search-box-last-queries span').each(function () {
            $(this).css('background-color', ColorLib.getRandomColor());
        });

    };

}