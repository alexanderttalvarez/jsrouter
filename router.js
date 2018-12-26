/**
 * Simple router in vanilla JavaScript. Works only with basic routes without parameters
 * It uses routes of hash type
 */
class Router {

    /**
     * @param {String} el - The DOM element using the querySelector form
     * @param {Function} rootRouteCallback - A callback function for the root route
     * @param {Function} emptyRouteCallback - (Optional) A callback function for the undefined routes
     */
    constructor( el, rootRouteCallback, emptyRouteCallback ) {

        // Initializing the routes array
        this.routes = [];

        // Checking that the el element has been set
        if( !!el !== false ) {
            this.el = el;
        } else {
            throw new Error("Router needs a DOM entry point.");
        }

        // Checking that the el element has been set
        if( !!rootRouteCallback !== false ) {
            this.rootRouteCallback = rootRouteCallback;
        } else {
            throw new Error("Router needs a callback function for the root route.");
        }

        // Defining a default behaviour for an empty route, and changing it in case of getting it as parameter
        this.emptyRouteCallback = emptyRouteCallback !== undefined ? emptyRouteCallback : () => {
            return "The current route doesn't exist";
        };

        // Starting the on has change event handler
        window.onhashchange = this.hashChanged.bind(this);

    }

    /**
     * Reads the URL when the class is loaded and renders the HTML
     */
    start() {

        const htmlOutput = this.getHTML( document.baseURI );

        this.render( htmlOutput );

    }

    /**
     * Tries to find a URL, and returns its HTML or the not found HTML
     * @param {String} url - The location pathname
     * 
     * @return {String} - The HTML
     */
    getHTML( url ) {

        let htmlOutput = null;

        const baseURL = window.location.protocol + '//' + window.location.hostname + (location.port ? ':'+location.port: '') + '/';

        if( url === baseURL ) {
            htmlOutput = this.rootRouteCallback();
        } else if( this.hashURL( url ) !== null
            && this.routes[ this.hashURL( url ) ] !== undefined ) {
                
            htmlOutput = this.routes[this.hashURL( url )]();
        } else {
            htmlOutput = this.emptyRouteCallback();
        }

        return htmlOutput;

    }

    /**
     * It adds a new valid route
     * @param {String} route - The route to be created, prefix must be /
     * @param {Class} callback to be fired when the route is reached
     */
    addRoute( route, callback ) {

        if( !!route !== false
            && typeof( callback ) === 'function' ) {
                this.routes[route] = callback;
        } else {
            throw new Error("The route can't be empty and the callback must be a function");
        }
        
    }

    /**
     * Gets an array of routes
     * 
     * @return {Array}
     */
    get getRoutes() {
        return this.routes;
    }

    /**
     * Action to be trigered everytime that the hash changes in the URL.
     * It gets the old and new URL and runs the specified method.
     * @param {Object} context 
     */
    hashChanged( context ) {

        const newURL = context.newURL;

        this.render( this.getHTML( newURL ) );
        
    }

    /**
     * Prints the resulting HTML of the callback function into the selected DOM element
     * @param {String} htmlOutput 
     */
    render( htmlOutput ) {

        document.querySelector(this.el).innerHTML = "";
        if( !!htmlOutput !== false ) {
            document.querySelector(this.el).innerHTML = htmlOutput;
        }

    }

    /**
     * Receives an URL and returns the hash
     * @param {string} url 
     * 
     * @return {string} The current route
     */
    hashURL( url ) {

        const hashStart = url.indexOf( '#/' ) + 1;

        if( hashStart !== 0 ) {
            return url.substr( hashStart, url.length - hashStart );
        }

        return null;

    }

}

export default Router;