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

    // renderImage(album.headerImage, album.id);
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

// ******************************** CLICK FUNCTIONALITY TO IMAGES **************************************

function imageClick() {
  localStorage.setItem("pictureId", this.getAttribute('id'));
  console.log("imageClick funktionen kör! (Här är den i localStorage): " + JSON.stringify(localStorage.getItem("pictureId")));
  location.href = 'imageSelected.html'; // Jump to the 'imageSelected' page
}

window.onload = function () {
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
window.addEventListener('load', (event) => {
  console.log("Här är picture1Comment: " + localStorage.getItem("picture1Comment"));
  console.log("Såhär ser denna bilds localStorage + comment ut: " + localStorage.getItem(localStorage.getItem("pictureId") + "Comment"));
  console.log("Såhär ser denna bilds localStorage + title ut: " + localStorage.getItem(localStorage.getItem("pictureId") + "Title"));

  // Two if-cases check if user has saved a custom title or comment for the image in question. IF-there-are-saved-texts THEN load those custom texts and display them
  if (localStorage.getItem(localStorage.getItem("pictureId") + "Comment")) {
    document.getElementById("comments-display-field").innerText = localStorage.getItem(localStorage.getItem("pictureId") + "Comment");
  }

  if (localStorage.getItem(localStorage.getItem("pictureId") + "Title")) {
    document.getElementById("bild-titel").innerText = localStorage.getItem(localStorage.getItem("pictureId") + "Title");
  }

  if (localStorage.getItem(localStorage.getItem("pictureId") + "avgRating")) {
    document.getElementById("rating-display").innerText = "Snittbetyg: " + localStorage.getItem(localStorage.getItem("pictureId") + "avgRating");
  }

  console.log('page is fully loaded');
  let imageTitle = document.getElementById("bild-titel");
  let image = document.getElementById("highlighted-image"); // picture
  let imageDescription = document.getElementById("comments-display-field"); // description

  fetch("/app-data/library/picture-library.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data); // "data" är alltså våran feta JSON array! (picture-library.json)
      console.log("Här är pictures!: " + JSON.stringify(data.albums[0].pictures))  // På såhär vis kan man printa samtliga bilder från JSON arrayen (index 0)! (Bygg vidare på detta)

      for (let i = 0; i < data.albums.length; i++) {
        console.log("Här borde det stå 4 eller 5: " + data.albums.length); // DENNA FUNGERAR, VI HITTAR ALLA INDEX!
        for (let j = 0; j < data.albums[i].pictures.length; j++) {
          if (data.albums[i].pictures[j].id == localStorage.getItem("pictureId")) {
            image.style.backgroundImage = "url(/" + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes + `)`; // vi hade glömt ett + efter imgLoRes

            // These two if-cases check if there are no "custom" (user-made) titles or descriptions for images in the library. If there are NO custom texts, load in the default ones
            if (!localStorage.getItem(localStorage.getItem("pictureId") + "Title")) {
              imageTitle.innerText = data.albums[i].pictures[j].title;
            }

            if (!localStorage.getItem(localStorage.getItem("pictureId") + "Comment")) {
              imageDescription.innerText = data.albums[i].pictures[j].comment;
            }
          }
        }
      }
    });
  // *************************************************************************************************


  // *************************************************************************************************
  // Functions and eventListiners for changing the comment and/or title of an image
  function changeImgComment() {
    let newComment = document.getElementById("comment-field-text").value;
    let commentField = document.getElementById("comments-display-field");

    localStorage.setItem(localStorage.getItem("pictureId") + "Comment", newComment); // (picture1Comment, *det du skrev som ny kommentar*)
    console.log("Här är picture1Comment: " + localStorage.getItem("picture1Comment")); // Använd "picture1" som test bild!  ---  DEN HÄR FUNGERAR, Sparas i localStorage! 

    commentField.innerHTML = newComment;
    console.log(commentField);
    console.log(commentField.innerHTML)
  }

  function changeImgTitle() {
    let newTitle = document.getElementById("comment-field-text").value;
    let imgTitle = document.getElementById("bild-titel");

    localStorage.setItem(localStorage.getItem("pictureId") + "Title", newTitle);

    imgTitle.innerHTML = newTitle;
  }

  document.getElementById("comment-edit-button").addEventListener("click", changeImgComment);
  document.getElementById("title-edit-button").addEventListener("click", changeImgTitle);
  // ******************************************************************************

  // Functions and eventListiners for changing the rating an image
  // *************************************************************
  // (Annoying BS bug was fixed by having five separate methods instead of a single method (javaScript is dumb, I'm NOT the problem))
  let yourRating;
  let ratingsTotal;
  let ratingCounter;
  let ratingAverage;

  // This IF-statement ensures that average rating of an UNRATED image starts at 0 (zero), while a previously rated image loads the last avrage rating!
  if (localStorage.getItem(localStorage.getItem("pictureId") + "avgRating")) {
    ratingsTotal = parseInt(localStorage.getItem(localStorage.getItem("pictureId") + "totalRatings")); // This needed to be parsed back to an INT in order to not bug out
    ratingCounter = localStorage.getItem(localStorage.getItem("pictureId") + "rateCount");
    ratingAverage = localStorage.getItem(localStorage.getItem("pictureId") + "avgRating");
  }
  else {
    ratingAverage = 0;
    ratingCounter = 0;
    ratingsTotal = 0;
  }

  console.log("Average rating of this image is: " + ratingAverage);
  console.log("This image has been rated: " + ratingCounter + " times");
  console.log("ratingsTotal: " + ratingsTotal);

  function rateImg1() {
    console.log("I början av metoden är ratingsTotal: " + ratingsTotal);

    console.log("NU HAR DU TRYCKT PÅ EN STJÄRNA :)");
    yourRating = 1;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    console.log("När vi sparar ratingsTotal i localStorage ser den ut såhär: " + ratingsTotal);

    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;

    console.log("Din rating blev: " + yourRating);
    console.log("Här är ratingVar: " + ratingVar);

    console.log("I slutet av metoden är ratingsTotal: " + ratingsTotal);
  }

  function rateImg2() {
    console.log("NU HAR DU TRYCKT PÅ EN STJÄRNA :)");
    yourRating = 2;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;

    console.log("Din rating blev: " + yourRating);
    console.log("Här är ratingVar: " + ratingVar);
  }

  function rateImg3() {
    console.log("NU HAR DU TRYCKT PÅ EN STJÄRNA :)");
    yourRating = 3;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;

    console.log("Din rating blev: " + yourRating);
    console.log("Här är ratingVar: " + ratingVar);
  }

  function rateImg4() {
    console.log("NU HAR DU TRYCKT PÅ EN STJÄRNA :)");
    yourRating = 4;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;

    console.log("Din rating blev: " + yourRating);
    console.log("Här är ratingVar: " + ratingVar);
  }

  function rateImg5() {
    console.log("NU HAR DU TRYCKT PÅ EN STJÄRNA :)");
    yourRating = 5;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;

    console.log("Din rating blev: " + yourRating);
    console.log("Här är ratingVar: " + ratingVar);
  }

  // Tryck på stjärna 3 = skicka en '3':a till rateImg functionen ("click", "rateImg");
  let rateOne = document.getElementById("rating-1");
  let rateTwo = document.getElementById("rating-2");
  let rateThree = document.getElementById("rating-3");
  let rateFour = document.getElementById("rating-4");
  let rateFive = document.getElementById("rating-5");

  rateOne.addEventListener("click", rateImg1);
  rateTwo.addEventListener("click", rateImg2);
  rateThree.addEventListener("click", rateImg3);
  rateFour.addEventListener("click", rateImg4);
  rateFive.addEventListener("click", rateImg5);
  // Functions and eventListiners for changing the rating an image
  // *************************************************************

  // ***************************** SLIDESHOW ********************************
  function slideShowGalaxiesFunc() {
    // PSEUDO: Make "playSlideShowButton" visible and clickable so that it can START a SLIDESHOW

    document.getElementById("picID0").addEventListener("click",)
    document.getElementById("picID1").addEventListener("click", /* här ska vi kalle på en metod*/);
    document.getElementById("picID2").addEventListener("click",);
    document.getElementById("picID3").addEventListener("click",);
    document.getElementById("picID4").addEventListener("click",);
    document.getElementById("picID5").addEventListener("click",);
  }

  let slideShowBtnGalaxies = document.getElementById("slideshow-galaxies");
  slideShowBtnGalaxies.addEventListener(click, slideShowGalaxiesFunc);

  // ***************************** SLIDESHOW ********************************
});