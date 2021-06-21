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
     * Stores the home query key
     * @type {string}
     */
    const $home_query = '__SEACH_ALL_HOME__';

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

    let $result_colors = [];
    let $result_stars = [];
    let $stars = [1, 2, 3, 4, 5];
    for (let $j = 0; $j < 1000; $j++) {
        let $hue = Math.floor(Math.random() * 360),
            $saturation = Math.floor(Math.random() * 100),
            $lightness = Math.floor(Math.random() * 50);
        let $color = "hsl(" + $hue + ", " + $saturation + "%, " + $lightness + "%)";
        $result_colors.push($color);
        $result_stars.push($stars.randomElement());
    }


    /**
     * Appends a result of the search query.
     *
     * @param {string} $title - Card title
     * @param {string} $img - Card image
     * @param {string} $stars - Card stars
     * @param {string} $region - Card region
     * @param {string} $other - Other description
     * @param {string} $description - Card description
     * @param {number} $result_number - Number of the card
     * @param {number} $store_index - Index of the store
     */
    this.appendResultStoreCard = function ($title, $img, $stars,
                                           $region, $other, $description,
                                           $result_number, $store_index) {

        // Create random ID
        let $id = generateID();

        let $html = `
        <a href="http://127.0.0.1:8000/store/${$store_index}">
            <div class="results-card-box hvr-grow" id="${$id}">
                <div class="results-card-stars"><i class="fas fa-star"></i> ${$stars} / 5</div>
                <div class="results-card-region">${$region}</div>
                <div class="results-card-other">${$other}</div>
                <div class="results-card-title">${$title}</div>
                <div class="results-card-description">${$description}</div>
            </div>
        </a>
        `;

        self._results_box.append($html);

        // Get the jQuery object
        let $box = $('#{0}'.format($id));

        if (File.isFileImageExtension($img)) {
            $box.css('background-image', 'url({0}),linear-gradient(45deg,#000000,#00000000)'.format($img));
        } else {
            $box.css('background-color', $result_colors[$result_number]);
        }

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
        ]
        let $description = [
            'Ricas empanadas de pollo revueltas en jamon y queso', // 50
            'Librería de libros de papel impresos en tinta con tamaños similares en todo Chile muy barato compre compre rápido', // 113
            'Tienda de ropa y diseño de última generación @tiendaChileBonitoYElegante en Chile y todo el mundo compre rápido y ahora o perderá la oferta.' // 140 ]
        ];
        let $stars = [1, 2, 3, 4, 5];
        let $other = '{0} productos'.format(Math.getRandomInt(40, 10000));
        self.appendResultStoreCard(
            $title.randomElement(),
            $img.randomElement(),
            $stars.randomElement(),
            $regions.randomElement(),
            $other,
            $description.randomElement(),
            1,
            1
        )
    };

    /**
     * Write store seach result.
     *
     * @param $store - Store json data
     * @param $resultnum - Number of the card
     * @private
     */
    this._write_search_result = function ($store, $resultnum) {
        self.appendResultStoreCard(
            $store['brand_name'],
            $store['store_image_profile'],
            $store['stars'] === 0 ? $result_stars[$resultnum] : $store['stars'],
            $store['region'],
            $store['commune'], // N products
            $store['short_description'],
            $resultnum,
            $store['id']
        )
    };

    /**
     * This function process the input text from the search box.
     *
     * @param {string=} $query - Accepts query text, if null gets from the input text
     * @private
     */
    this._process_search_text = function ($query) {
        if ($query !== $home_query) {
            $query = self._search_input.val();
        }
        let $query_sanitized = escape($query); // TODO
        if ($query.length < 2) {
            return self._process_search_text($home_query);
        }
        ajaxPostDataString('http://127.0.0.1:8000/store/search/{0}'.format($query_sanitized), 'get',
            '',
            ($data) => {
                let $keys = Object.keys($data);
                $keys.sort();
                self._results_box.empty();
                if ($keys.length === 0) {
                    self._results_box.append(`
                    <div class="results-empty">
                        <i class="far fa-sad-tear"></i> No se han encontrado resultados para la búsqueda</div>
                    `)
                } else {
                    for (let $i = 0; $i < $keys.length; $i++) {
                        self._write_search_result($data[$keys[$i]], $i);
                    }
                }
            }, () => {
            });
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
        let $update_box_margin = () => {
            if (app_dom.window.width() < 640) {
                self._search_box.css('margin-top', $contents_height * 0.05);
            } else {
                self._search_box.css('margin-top', $contents_height * 0.1);
            }
        }
        $update_box_margin();
        app_dom.window.on('resize.updateSearchboxTopMargin', $update_box_margin);

        // Set search event
        self._search_input.on('input.findtext', self._process_search_text);

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

        // Check if page inits with seach value
        if (self._search_input.val() !== '') {
            self._process_search_text();
        } else {
            self._process_search_text($home_query);
        }

    };

}