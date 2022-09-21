'use strict'

import * as lib from '../model/picture-library-browser.js';                 // NEEDED ??
let picsFromPlanetsAlbum = document.getElementById("pics-from-planets-album-div");
let headerImagePlanetsAlbum = document.getElementById("planets-header-image");
let slideShowHubbleContent= document.getElementById("slideshow-modal-content");
let slideShowHubbleModal = document.getElementById("slideshow-modal-id");                 // for slideshow
let slideShow = document.getElementById("slideshow");
/* ----------------------------------- SLIDESHOW ---------------------------------------- */

// EFTER LUNCH, Snygga till modalen, fixa planets tills hela gruppen är nöjda med sidan, copy pasta ny planets kod till samtliga album!


let startPoint = 0
let images = [];
let time = 2000;

let imgPicked = {};
imgPicked[0] = false;
imgPicked[1] = false;
imgPicked[2] = false;

let myInterval; // Declared the interval variable here so it is accessable

window.onload = function () {
    document.querySelector('#slideshow-galaxies-stop').disabled = true;


    console.log("picsFromPlanetsAlbum: " + picsFromPlanetsAlbum);

    fetch("../app-data/library/picture-library.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.albums[3].pictures.length);
            console.log("data: " + data);
            for (let i = 0; i < data.albums[3].pictures.length; i++) {
                picsFromPlanetsAlbum.innerHTML += (`<img src="` + data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes + `" id='imgId` + i + "'>");
            }

            headerImagePlanetsAlbum.innerHTML += (`<img src="../app-data/library/pictures/album-header/hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg">`);

            // This function gets all images that user has clicked (based on if images{} indexes are true or false) and then shows them with a two second interval
            function playSlideShow() {
            
                if (imgPicked[0] == false && imgPicked[1] == false && imgPicked[2] == false) {
                    console.log("Välj MINST en bild, dumbass...")

                } else {
                    document.querySelector('#slideshow-galaxies-show').disabled = true;
                    document.querySelector('#slideshow-galaxies-stop').disabled = false;

                    console.log("Du klickade på spela slideshow! :)")

                    for (let i = 0; i < data.albums[3].pictures.length; i++) {
                        if (imgPicked[i] == true) {
                            images[i] = data.albums[3].path + `/` + data.albums[3].pictures[i].imgLoRes; // All highlighted images are stored in the images array
                        };
                    }


                    myInterval = setInterval(function () {
                        slideShow.style.visibility = "visible"; // Shows "slideShow" when we need it, hide it when slideShow is not shown or is cancelled
                        slideShowHubbleModal.style.display = "block";

                        for (let j = 0; j < 1; j++) {
                        
                            slideShow.setAttribute("src", images[startPoint]);
                            console.log("DEN HÄR LOOPEN ÄR OÄNDLIG: slideShowHubble.src: " + slideShow.src);
                            console.log("Här är erat J: " + j);

                            if (startPoint < images.length - 1) {
                                startPoint++;
                            } else {
                                startPoint = 0;
                            }
                            console.log("slideShowHubble.src: " + slideShow.src);
                        }
                        
                    }, time);
                }
            }

            function stopSlideShow() {
                // These two lines enable or disable the show/cancel slideShow buttons when they can/can't be used
                document.querySelector('#slideshow-galaxies-show').disabled = false;
                document.querySelector('#slideshow-galaxies-stop').disabled = true;
                clearInterval(myInterval); // With "clearInterval" the interval of displaying new images during the slideShow is stopped
                images = []; // Empties array so that it can be re-filled with images per users choice before "Start slideShow" is pressed
            }


            function clickImg1() {
                if (imgPicked[0] == false) {
                    imgPicked[0] = true;
                    document.getElementById("imgId0").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[0] = false;
                    document.getElementById("imgId0").style.boxShadow = "none";
                }
            }

            function clickImg2() {
                if (imgPicked[1] == false) {
                    imgPicked[1] = true;
                    document.getElementById("imgId1").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[1] = false;
                    document.getElementById("imgId1").style.boxShadow = "none";
                }
            }

            function clickImg3() {
                if (imgPicked[2] == false) {
                    imgPicked[2] = true;
                    document.getElementById("imgId2").style.boxShadow = "0px 0px 100px 0px rgb(255, 194, 80)";
                } else {
                    imgPicked[2] = false;
                    document.getElementById("imgId2").style.boxShadow = "none";
                }
            }

            // Relevant event listiners:
            document.getElementById("imgId0").addEventListener("click", clickImg1)
            document.getElementById("imgId1").addEventListener("click", clickImg2)
            document.getElementById("imgId2").addEventListener("click", clickImg3)
            document.getElementById("slideshow-galaxies-show").addEventListener("click", playSlideShow);
            document.getElementById("slideshow-galaxies-stop").addEventListener("click", stopSlideShow);

        });

}