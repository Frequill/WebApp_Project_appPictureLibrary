'use strict'

import * as lib from '../model/picture-library-browser.js';                 // NEEDED ??

window.onload = function () {

    let picsFromGalaxiesAlbum = document.getElementById("pics-from-galaxies-album-div");
    let headerImageGalaxiesAlbum = document.getElementById("galaxies-header-image");

    console.log("picsFromGalaxiesAlbum: " + picsFromGalaxiesAlbum);

    fetch("../app-data/library/picture-library.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.albums[0].pictures.length);
            console.log("data: " + data);
            for (let i = 0; i < data.albums[0].pictures.length; i++) {

                // FUNKAR DEN HÄR NEDAN ??
                picsFromGalaxiesAlbum.innerHTML += (`<img src="` + data.albums[0].path + `/` + data.albums[0].pictures[i].imgLoRes + `" id='` + "picID" + i + `'>`);
            }

            console.log(`<img src="../app-data/library/pictures/album-header/PIA04921~small.jpg">`);
            headerImageGalaxiesAlbum.innerHTML += (`<img src="../app-data/library/pictures/album-header/PIA04921~small.jpg">`);
        });

    // -----------------------------TEST FÖR IMAGE CLICK FUNCTIONALITY----------------------------------------

    let library;  //Global varibale, Loaded async from the current server in window.load event

    // library = await lib.pictureLibraryBrowser.fetchJSON(libraryJSON);  //reading library from JSON on local server 
    library = lib.pictureLibraryBrowser.createFromTemplate();  //generating a library template instead of reading JSON

    function imageClick() {
        localStorage.setItem("pictureId", this.getAttribute('id'));
        console.log("imageClick funktionen kör! (Här är den i localStorage): " + JSON.stringify(localStorage.getItem("pictureId")));
        location.href = 'imageSelected.html'; // Jump to the 'imageSelected' page
        // ************* HÄR VERKAR DET SOM ATT 'clickedImageID' töms och blir "undefined" igen *************
    }

    // ACTION-LISTENER-LOOP     THIS WORKS! Adds actionListiners to all images 
    let counterPic = 1;
    for (const album of library.albums) {
        let amountOfPics = album.pictures.length;
        for (let i = 0; i < amountOfPics + 1; i++) { // vf funkar +1 ????
            document.getElementById("picture" + counterPic).addEventListener('click', imageClick);
            counterPic++;
        }
    }

    // ********************************************* index.html *********************************************

    // ***************************************** imageSelected.html *****************************************

    console.log("**************************************************************");

    window.addEventListener('load', (event) => {
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

                            image.style.backgroundImage = "url(/" + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes + `)`; // vi hade glömt ett + efter imgLoRes

                            imageDescription.innerText = data.albums[i].pictures[j].comment; // för att få fram beskrivning
                            console.log(`data.albums[i].path + data.albums[i].pictures[j].imgLoRes: ` + '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
                            console.log(`image.url: ` + image.url);
                            console.log('url', '/' + data.albums[i].path + '/' + data.albums[i].pictures[j].imgLoRes);
                        }
                    }
                }
            });
    });
    // -----------------------------TEST FÖR IMAGE CLICK FUNCTIONALITY----------------------------------------
}