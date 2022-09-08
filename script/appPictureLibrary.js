//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

const libraryJSON = "picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event

//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {

  // library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
  library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

  for (const album of library.albums) {

    renderImage(album.headerImage, album.id);
    for (const picture of album.pictures) {
      renderImage(`${album.path}/${picture.imgLoRes}`, picture.id);
      // renderImage(`${album.path}/${picture.imgHiRes}`, picture.id);
    }
  }
})

window.addEventListener('click', () => {

  //just to confirm that the library is accessible as a global variable read async
  console.log(`library has ${library.albums.length} albums`);
});

//Render the images
function renderImage(src, tag) {

  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.id = tag;
  /*
  div.dataset.albumId = tag; // data-album-id ??
  */
  const img = document.createElement('img');
  img.src = src;
  div.appendChild(img);

  const imgFlex = document.querySelector('.FlexWrap');
  imgFlex.appendChild(div);
};

window.onload = function () {
  function colorSwap() {
    const test = document.getElementById("test-id");
    test.style.backgroundColor = "red";
    test.innerHTML = "Tate";
  }


  /*
  let pictureCounter = 0;            //   HERE IS WHERE WE LEFT OFF YESTERDAY - This does not yet work
  const fs = require('fs');
  const dir = './pictures';
  fs.readdir(dir, (err, files) => {
    console.log(files.length);
    pictureCounter = files.length;
  });

  let counterPic = 1;
    for (let i = 1; i <= pictureCounter; i++) {
      document.getElementById("pictureTest" + counterPic).addEventListener('click', colorSwap);
      counterPic++;
    }
    */


  
  // ACTION-LISTINER-LOOP     THIS WORKS... BUT DOES NOT ADD ACTION-LISTINERS TO LAST 5 PICTURES??
  let counterPic = 1;
  for (const album of library.albums) {
    for (const picture of album.pictures) {
      document.getElementById("pictureTest" + counterPic).addEventListener('click', colorSwap);
      counterPic++;
    }
  }
}


/* document.getElementById("toros01").addEventListener("click", displayDate); /* FULLT fungerande action listener! */
/*
function displayDate() {
  document.getElementById("toros01").innerHTML = Date();
}
*/

console.log(libraryJSON.stringify);

console.log(libraryJSON(0));
console.log(libraryJSON[0]);
console.log(libraryJSON);

//obj.valueOf(Object.keys(obj).indexOf('String_to_Find'))

// console.log(stringify.libraryJSON(0));

/* Test comment for first commit! */