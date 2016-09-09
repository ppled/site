(function() {
    var ppa = window.ppa = {};

    /**
     *
     */
    function setup() {

        /**
         * Moves existing and creates new elements for custom editing
         * features
         */
        function arrangeFields() {

            // move title to own box
            function moveTitle() {
                var $title = $('.next-input#product-name').parent('.next-input-wrapper');
                var $tabsCard = $title.parents('.next-card');
                var $titleCard = $tabsCard.clone();
                var $titleSection = $titleCard.find('.next-card__section');

                $tabsCard.addClass('tabs');
                $titleSection.html('');
                $title.appendTo($titleSection);
                $titleCard
                    .addClass('title')
                    .insertBefore($tabsCard);
            }

            // move tabs below images
            function moveTabs() {
                var $imageCard = $('.next-card.images');
                var $tabsCard = $('.next-card.tabs');

                $imageCard.insertBefore($tabsCard);
            }

            // add tabs heading
            function addTabsHeading() {
                var $imageHeading = $('.next-card.images').find('.next-card__header');
                var $tabsCard = $('.next-card.tabs');
                var $tabsHeading = $imageHeading.clone();
                var $tabsWrapper = $tabsHeading.find('.wrappable__item:first');

                $tabsWrapper
                    .find('.next-heading')
                        .text('Tabs');

                $tabsHeading
                    .find('.wrappable')
                        .html($tabsWrapper)
                        .end()
                    .prependTo($tabsCard);
            }

            // create product specs field
            function createSpecs() {
                var $descWrapper = $('#product-description_parent').parents('.next-input-wrapper');
                var $titleWrapper = $('.next-card.title .next-input-wrapper:first');
                var $specsWrapper = $titleWrapper.clone();
                var slug = 'product-specs';
                var $field = $('<textarea></textarea>', {
                    rows: '10',
                    id: slug,
                    class: 'next-input',
                    placeholder: 'Lights so bright they\'ll blind you...'
                });

                $specsWrapper
                    .find('.next-label')
                        .attr('for', slug)
                        .text('Specs')
                        .end()
                    .find('.next-input')
                        .remove()
                        .end()
                    .append($field)
                    .insertAfter($descWrapper);
            }

            moveTitle();
            moveTabs();
            addTabsHeading();
            createSpecs();
        }

        /**
         *
         */
        function parseFields(raw) {
            var $raw = $('<div>' + raw + '</div>');
            var $customs = $raw.find('.ppa-custom');
            var fields = {};

            $customs.each(function() {
                var $field = $(this);
                var field = $field[0];
                var name = $field.data('name');
                var custom = {};

                custom.inner = field.innerHTML;
                custom.outer = field.outerHTML;
                fields[name] = custom;
            });

            return fields;
        }

        /**
         *
         */
        function getFields() {
            var $description = $('#product-description');
            var fields = ppa.fields = {};

            fields.description = {};
            fields.description.raw = $description.html();
            fields.description.parsed = fields.description.raw;
            fields.custom = parseFields(fields.description.raw);

            for(var name in fields.custom) {
                var field = fields.custom[name];

                fields.description.parsed = fields.description.parsed.replace(field.outer, '');
            }
        }

        /**
         *
         */
        function updateFields() {
            var $description = $('#product-description');
            var $specs = $('#product-specs');
            var fields = ppa.fields;

            $description.html(fields.description.parsed);
            $specs.html(fields.custom.specs.inner);
        }

        arrangeFields();
        getFields();
        updateFields();
    }

    /**
     * Removes stylesheet inserted by Tampermonkey
     */
    function removeLoader() {
        $('style').each(function() {
            if($(this).text().indexOf('@keyframes pp-spin') > -1)
                $(this).remove();
        });
    }

    $(window).on('load', function() {

        // run setup
        setup();

        // clear preloader
        setTimeout(function() {
            removeLoader();
        }, 1000);
    });
})();