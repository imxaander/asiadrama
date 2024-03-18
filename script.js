$('.carousels').flickity({
    // options
    cellAlign: 'left',
    contain: true
});

if(!("favs" in localStorage)){
    localStorage.setItem("favs", "")
    
}
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}