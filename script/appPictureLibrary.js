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
  let image = document.getElementById("highlighted-image");

  fetch("/app-data/library/picture-library.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data); // "data" är alltså våran feta JSON array! (picture-library.json)
      console.log("Här är pictures!: " + JSON.stringify(data.albums[0].pictures))  // På såhär vis kan man printa samtliga bilder från JSON arrayen (index 0)! (Bygg vidare på detta)
      // Med for-loop eller liknande för att printa/hämta alla bilder i hela arrayen

      for (let i = 0; i < data.albums.length; i++) {
        console.log("Här borde det stå 4 eller 5: " + data.albums.length); // DENNA FUNGERAR, VI HITTAR ALLA INDEX!
        for (let j = 0; j < data.albums[i].pictures.length; j++) {
          // console.log("localStorage.getItem(\"pictureId\"): " + localStorage.getItem("pictureId"));
          // console.log('data.albums[i].pictures[j].id: ' + data.albums[i].pictures[j].id);
          // console.log('imageTitle.innerText: ' + imageTitle.innerText);
          if (data.albums[i].pictures[j].id == localStorage.getItem("pictureId")) {
            // console.log("Julius bullshit: " + data.albums[i].pictures[j].title)
            imageTitle.innerText = data.albums[i].pictures[j].title;  

            // BELOW IS WRONG SYNTAX
            image.style.backgroundImage="url(/" + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes`)`;

            // object.style.backgroundImage="url(img_tree.gif)"

            // image.setAttribute('url', '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
            // image.url = '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes;
            console.log(`data.albums[i].path + data.albums[i].pictures[j].imgLoRes: ` + '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
            console.log(`image.url: ` + image.url);
            console.log('url', '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
            

            // document.body.style.cssText = 'color:#abcdef;';
            
            //src = "data.albums[4].path/PIA22574~small.jpg"

            //              /app-data/library/pictures/galaxies/PIA04921~orig.jpg
            //              ^                                                        
          } 
        }
      }
    });

  // imageTitle.innerText = (localStorage.getItem("pictureId"))
});

// -----------------------------JSON PARSE - TEST-----------------------------------
/*
console.log(JSON.parse(libraryJSON));

let imageGalleryObject = JSON.parse(libraryJSON);

console.log(imageGalleryObject.albums.pictures);

for (let album of imageGalleyObject) {
  for (let picture of imageGalleyObject.albums) {
    if (imageTitle == imageGalleryObject.albums.pictures.id) {
      imageTitle.innerText = imageGalleryObject.albums.pictures.title;
    }
  }
}
*/
// -----------------------------JSON PARSE - TEST-----------------------------------



//function() => {

//  window.onload = (event) => {

//};
//}


//obj.valueOf(Object.keys(obj).indexOf('String_to_Find'))

// console.log(stringify.libraryJSON(0));

/* Test comment for first commit! */