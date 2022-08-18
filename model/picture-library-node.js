//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//This module creates a library class that can be used in Node
//, it also generates a new JSON file of template library using node
//to run this program from terminal 
// - open a terminal in the project directory
// - in the terminal, type: node ./model/picture-library-node.js


//required node library
import * as path from 'path';
import * as fs from 'fs';

import * as proto from './picture-album-prototypes.js';
import * as lib from './picture-library.js';

const applicationDir = path.resolve('./');
const libraryDir = "app-data/library";
const libraryJSON ="picture-library.json";

class pictureLibraryNode extends lib.pictureLibrary {

    constructor() {
        super();
    }

    static createJSON(file) {

        //create templates and write a JSON file
        const library = lib.pictureLibrary.createFromTemplate();
        writeJSON(file, library);
        return library;
    }

    static fromJSON(file) {

        //read the JSON file
        const library = readJSON(file);

        //attach the protottypes of all album and picture objects
        lib.pictureLibrary.attachPrototypes(library);
        return library;
    }

 }

//debugging purpose only
/*
//generate a new JSON file from a template
let library = pictureLibraryNode.createJSON(libraryJSON);

//read it in again to confirm
library = pictureLibraryNode.fromJSON(libraryJSON);


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
*/


//helper functions to read and write JSON
function fileExists(fname) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    return fs.existsSync(path.resolve(dir, fname));
}

function writeJSON(fname, obj) {
    const dir = path.join(applicationDir, `/${libraryDir}`);
    let s = JSON.stringify(obj);

    fs.writeFileSync(path.resolve(dir, fname), JSON.stringify(obj));
}

function readJSON(fname) {
    const dir = path.join(applicationDir, `/${libraryDir}`);

    const obj = JSON.parse(fs.readFileSync(path.resolve(dir, fname), 'utf8'));
    return obj;
}

export {pictureLibraryNode};