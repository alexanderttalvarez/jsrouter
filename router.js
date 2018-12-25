/**
 * Simple router in vanilla JavaScript. Works only with basic routes without parameters
 * It uses routes of hash type
 */
class Router {

    /**
     * @param {String} el - The DOM element using the querySelector form
     * @param {Function} emptyRouteCallback - A callback function for the undefined routes
     */
    constructor( el, emptyRouteCallback ) {

        // Checking that the el element has been set
        if( !!el !== false ) {
            this.el = el;
        } else {
            throw new Error("Router needs a DOM entry point.");
        }
        
        this.routes = [];

        this.emptyRouteCallback = emptyRouteCallback !== undefined ? emptyRouteCallback : () => {
            return "The current route doesn't exist";
        };
        window.onhashchange = this.hashChanged.bind(this);
    }

    /**
     * It adds a new valid route
     * @param {string} route - The route to be created, prefix must be /
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
        let htmlOutput;

        // Executing the controller
        if( this.hashURL( newURL ) !== null
            && this.routes[ this.hashURL( newURL ) ] !== undefined ) {
                
            htmlOutput = this.routes[this.hashURL( newURL )]();
        } else {
            htmlOutput = this.emptyRouteCallback();
        }

        this.render( htmlOutput );
        
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

        const baseURL = document.baseURI + '#/',
            hashStart = url.indexOf( '#/' ) + 1;
        
        if( hashStart !== -1 ) {
            const cleanURL = url.substr( hashStart, url.length - hashStart );

            return cleanURL;
        }

        return null;

    }

}

