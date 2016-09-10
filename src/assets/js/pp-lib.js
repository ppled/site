var PP = function(lib) {

    /**
     * Renders the provided handlebars template
     *
     * @returns {string} html
     */
    function renderTemplate(name, context) {
        var src = $('#' + name).html();
        var template = Handlebars.compile(src);

        // defaults
        context = context || {};

        return template(context);
    }
    
    /*
     * ProductAddons Class
     */
    lib.ProductAddons = function(selector, options) {
        if (!selector || !options) return false;

        var $selector = $('#' + selector);
        var $options = $selector.find('option');
        var product = options.product;

        console.log($options);
    };

    return lib;
}.call(window, {});