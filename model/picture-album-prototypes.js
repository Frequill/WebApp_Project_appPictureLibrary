//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

// To use ES6 modules, export and import, you need to create a package.json and set the type ot module.
// - open a terminal in your script directory and type: npm init -y
// - open the package file and add the line at the top: "type":"module", 

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export


const prototypeAlbum = {

    toString: function () { return `${this.id}: ${this.title} - ${this.comment}\n  pictureLocation: ${this.path}\n  albumImage: ${this.headerImage}` },
}

const prototypePicture = {

    toString: function () { return `${this.id}: ${this.title}\n  imgLoRes: ${this.imgLoRes}\n  imgHiRes: ${this.imgHiRes}\n${this.comment}` },    
}

//Helper function to get a unique id
function uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
};

export {prototypeAlbum, prototypePicture, uniqueId}
