//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

//import * as proto from './picture-album-prototypes.js';
import * as lib from '../model/picture-library-browser.js';

// ********************************************* index.html *********************************************

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

// Global scope
let clickedImageID; // Functions belonging to this variable still beeing tested


function imageClick() {
  clickedImageID = this.getAttribute('id'); // Saves the id of the picture that was clicked by user -- WE KNOW THIS WORKS :)
  location.href = 'imageSelected.html'; // Jump to the 'imageSelected' page
  document.getElementById("back-button").innerHTML("Testar om jag är dum i huvudet");
}

window.onload = function () {
  // ACTION-LISTENER-LOOP     THIS WORKS! Adds actionListiners to all images 
  let counterPic = 1;
  for (const album of library.albums) {
    let amountOfPics = album.pictures.length;
    for (let i = 0; i < amountOfPics + 1; i++) { // vf funkar +1 ????
      document.getElementById("pictureTest" + counterPic).addEventListener('click', imageClick);
      counterPic++;
    }
  }
}
// ********************************************* index.html *********************************************

// ***************************************** imageSelected.html *****************************************
/*
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  let imageTitle = document.getElementById("bild-titel");
  imageTitle.innerHTML = "test";});
  */
//function() => {

//  window.onload = (event) => {
    
  //};
//}














console.log(libraryJSON.stringify);

console.log(libraryJSON(0));
console.log(libraryJSON[0]);
console.log(libraryJSON);

//obj.valueOf(Object.keys(obj).indexOf('String_to_Find'))

// console.log(stringify.libraryJSON(0));

/* Test comment for first commit! */