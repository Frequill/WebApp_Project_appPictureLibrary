//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//This module generates a new JSON file from template using node
//It also demonstrates how to use the class pictureLibraryNode in a node program

//to run this program from terminal 
// - open a terminal in the project directory
// - in the terminal, type: node ./model/picture-library-generate-json-node.js


import * as proto from './picture-album-prototypes.js';
import * as lib from './picture-library-node.js';

const libraryJSON ="picture-library.json";


//generate a new JSON file from a template
let library = lib.pictureLibraryNode.createJSON(libraryJSON);

//read it in again to confirm
library = lib.pictureLibraryNode.fromJSON(libraryJSON);


console.group('list all albums and picture ')
console.log(`\Library have ${library.albums.length} albums(s):`)
for (const album of library.albums) {
    console.log('--- Album -----\n' + album);

    console.log(`\n${album.pictures.length} picture(s) in album:`)
    for (const picture of album.pictures) {
        console.log('\n' + picture);
    }
    console.log('---------------\n');
}
console.groupEnd();
