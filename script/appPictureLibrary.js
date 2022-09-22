'use strict'; // No sloppy code!
import * as lib from '../model/picture-library-browser.js';

// ********************************************* index.html *********************************************
const libraryJSON = "picture-library.json";
let library;  //Global varibale, Loaded async from the current server in window.load event

//use the DOMContentLoaded, or window load event to read the library async and render the images
window.addEventListener('DOMContentLoaded', async () => {
  library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

  for (const album of library.albums) {
    for (const picture of album.pictures) {
      renderImage(`${album.path}/${picture.imgLoRes}`, picture.id);
    }
  }
})

/* // Debug tool for ensuring the accessability of "library"
window.addEventListener('click', () => {
  console.log(`library has ${library.albums.length} albums`);
});
*/

//Render the images
function renderImage(src, tag) {
  const div = document.createElement('div');
  div.className = `FlexItem`;
  div.id = tag;

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

// *****************************************************************************************************


// ***************************************** imageSelected.html *****************************************

window.addEventListener('load', (event) => {
  // First two if-cases check if user has saved a custom title or comment for the image in question. IF-there-are-saved-texts THEN load those custom texts and display them
  // Third if-case checks if the image has previously been rated, if it has been the avrage rating will be displayed upon viewing the image
  if (localStorage.getItem(localStorage.getItem("pictureId") + "Comment")) {
    document.getElementById("comments-display-field").innerText = localStorage.getItem(localStorage.getItem("pictureId") + "Comment");
  }

  if (localStorage.getItem(localStorage.getItem("pictureId") + "Title")) {
    document.getElementById("bild-titel").innerText = localStorage.getItem(localStorage.getItem("pictureId") + "Title");
  }

  if (localStorage.getItem(localStorage.getItem("pictureId") + "avgRating")) {
    document.getElementById("rating-display").innerText = "Snittbetyg: " + localStorage.getItem(localStorage.getItem("pictureId") + "avgRating");
  }


  let imageTitle = document.getElementById("bild-titel");   // Title
  let image = document.getElementById("highlighted-image"); // Image
  let imageDescription = document.getElementById("comments-display-field"); // Description

  // This 'fetches' the picture-library json-file and stores it in a variable called "data"
  fetch("/app-data/library/picture-library.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data); // "data" becomes the information stored in JSON array 'picture-library.json'
      console.log("Här är pictures!: " + JSON.stringify(data.albums[0].pictures))  // På såhär vis kan man printa samtliga bilder från JSON arrayen (index 0)! (Bygg vidare på detta)

      // Go through every image and select the one which id equals the same id as that of the event listiner that was clicked
      for (let i = 0; i < data.albums.length; i++) {
        for (let j = 0; j < data.albums[i].pictures.length; j++) {
          if (data.albums[i].pictures[j].id == localStorage.getItem("pictureId")) { // If image id (from picture-library.json) is the same as the id of the event listiner
            image.style.backgroundImage = "url(/" + data.albums[i].path + '/' + data.albums[i].pictures[j].imgHiRes + `)`;

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

    // Users custom description (or comment) is stored locally
    localStorage.setItem(localStorage.getItem("pictureId") + "Comment", newComment);

    commentField.innerHTML = newComment;
    console.log(commentField);
    console.log(commentField.innerHTML)
  }

  function changeImgTitle() {
    let newTitle = document.getElementById("comment-field-text").value;
    let imgTitle = document.getElementById("bild-titel");

    // Users custom title is stored locally
    localStorage.setItem(localStorage.getItem("pictureId") + "Title", newTitle);

    imgTitle.innerHTML = newTitle;
  }

  document.getElementById("comment-edit-button").addEventListener("click", changeImgComment);
  document.getElementById("title-edit-button").addEventListener("click", changeImgTitle);

  // *************************************************************************************************

  // Functions and eventListiners for changing the rating an image
  // *************************************************************************************************

  let yourRating;
  let ratingsTotal;
  let ratingCounter;
  let ratingAverage;

  // This IF-statement ensures that average rating of an UNRATED image starts at 0 (zero), while a previously rated image loads the last avrage rating
  if (localStorage.getItem(localStorage.getItem("pictureId") + "avgRating")) {
    ratingsTotal = parseInt(localStorage.getItem(localStorage.getItem("pictureId") + "totalRatings")); // This needed to be parsed back to an INT in order to not cause bug(s)
    ratingCounter = localStorage.getItem(localStorage.getItem("pictureId") + "rateCount");
    ratingAverage = localStorage.getItem(localStorage.getItem("pictureId") + "avgRating");
  } else {
    ratingAverage = 0;
    ratingCounter = 0;
    ratingsTotal = 0;
  }

  /* // Useful console.logs for debugging:
  console.log("Average rating of this image is: " + ratingAverage);
  console.log("This image has been rated: " + ratingCounter + " times");
  console.log("ratingsTotal: " + ratingsTotal);
  */

  // These five separate "rateImg" functions are called separatly based on how many "stars" the user rates the picture as (1 through 5)
  function rateImg1() {
    yourRating = 1;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    // The users rating is saved locally
    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;
  }

  function rateImg2() {
    yourRating = 2;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    // The users rating is saved locally
    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;
  }

  function rateImg3() {
    yourRating = 3;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    // The users rating is saved locally
    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;
  }

  function rateImg4() {
    yourRating = 4;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    // The users rating is saved locally
    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;
  }

  function rateImg5() {
    yourRating = 5;
    ratingsTotal += yourRating;
    ratingCounter++;
    ratingAverage = ratingsTotal / ratingCounter;

    // The users rating is saved locally
    localStorage.setItem(localStorage.getItem("pictureId") + "totalRatings", ratingsTotal);
    localStorage.setItem(localStorage.getItem("pictureId") + "rateCount", ratingCounter);
    localStorage.setItem(localStorage.getItem("pictureId") + "avgRating", ratingAverage);

    let ratingVar = document.getElementById("rating-display");
    ratingVar.innerText = "Du gav bilden betyget " + yourRating + " av 5! \nGenomsnitt: " + ratingAverage;
  }

  // Based on which "star" the user selects between 1 and 5, the relevant function is called
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
  // *************************************************************************************************

});