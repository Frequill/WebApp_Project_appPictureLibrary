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





function imageClick() { 
  localStorage.setItem("pictureId", this.getAttribute('id'));
  console.log("imageClick funktionen kör! (Här är den i localStorage): " + JSON.stringify(localStorage.getItem("pictureId")));
  location.href = 'imageSelected.html'; // Jump to the 'imageSelected' page
  // ************* HÄR VERKAR DET SOM ATT 'clickedImageID' töms och blir "undefined" igen *************
}

window.onload = function () {
  // ACTION-LISTENER-LOOP     THIS WORKS! Adds actionListiners to all images 
  let counterPic = 1;
  for (const album of library.albums) {
    let amountOfPics = album.pictures.length;
    for (let i = 0; i < amountOfPics + 1; i++) { // vf funkar +1 ????
      document.getElementById("picture" + counterPic).addEventListener('click', imageClick);
      counterPic++;
    }
  }
}

// ********************************************* index.html *********************************************



// ***************************************** imageSelected.html *****************************************

console.log("******************************* Här är koden på rad 83 *******************************");

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  let imageTitle = document.getElementById("bild-titel");

  // console.log("Här är resultatet av att printa ett JSON element från den feta JSON filen: " + libraryJSON.id("l66egbjmvn3b62yhxlm"));

  // console.log("GÅR KANSKE DET HÄR ATT LÄSA ISTÄLLET?: " + JSON.stringify(localStorage.getItem("pictureId")));

  fetch("/app-data/library/picture-library.json")
  .then(function(resp){
    return resp.json();
  })
  .then(function(data){
    console.log(data); // "data" är alltså våran feta JSON array! (picture-library.json)
    console.log("Här är pictures???:" + JSON.stringify(data.albums[0].pictures))  // På såhär vis kan man printa samtliga bilder från JSON arrayen (index 0)! (Bygg vidare på detta)
                                                                                  // Med for-loop eller liknande för att printa/hämta alla bilder i hela arrayen
  });

  //console.log(this.data.albums.pictures.imageTitle);

  
  


  imageTitle.innerText = (localStorage.getItem("pictureId"))});
  



//function() => {

//  window.onload = (event) => {

//};
//}


//obj.valueOf(Object.keys(obj).indexOf('String_to_Find'))

// console.log(stringify.libraryJSON(0));

/* Test comment for first commit! */