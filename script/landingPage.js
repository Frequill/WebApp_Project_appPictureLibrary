'use strict';

window.onload = function () {
    // Get the modal
    let contactModal = document.getElementById("contact-modal-id");

    // Get the button that opens the modal
    let contactBtn = document.getElementById("contactButton");

    // Get the modal
    let aboutModal = document.getElementById("about-modal-id");

    // Get the button that opens the modal
    let aboutBtn = document.getElementById("aboutButton");

    // Get the <span> element that closes the modal
    let span01 = document.getElementsByClassName("close")[0];
    let span02 = document.getElementsByClassName("close")[1];

    // When the user clicks the button, open the modal 
    contactBtn.onclick = function () {
        contactModal.style.display = "block";
    }

    // When the user clicks the button, open the modal 
    aboutBtn.onclick = function () {
        aboutModal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span01.onclick = function () {
        contactModal.style.display = "none";
    }

    span02.onclick = function () {
        aboutModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == contactModal) {
            contactModal.style.display = "none";
        }
        if (event.target == aboutModal) {
            aboutModal.style.display = "none";
        }
    }
}