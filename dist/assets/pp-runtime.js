(function() {
    var ppr = window.ppr = {};

    function getUrlAttrs() {
        var search = window.location.search;
        var queries = search.substring(1).split('&');
        var attrs = {};

        queries.forEach(function(query) {
            var pair = query.split('=');

            attrs[pair[0]] = pair[1] || '';
        });

        ppr.urlAttrs = attrs;
    }

    function enableDev() {

        // enabled
        if(ppr.urlAttrs.dev)
            ppr.dev = true;

        // disabled
        else ppr.dev = false;
    }

    getUrlAttrs();
    enableDev();
})();