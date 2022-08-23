/* Change img to Andrew Tate when hovering over img */
document.getElementById("imageTest").addEventListener("mouseover", imgHover); /* FULLT fungerande action listiner! */

function imgHover() {
    const tate = "https://static.independent.co.uk/2022/08/11/16/Andrew%20Tate.jpg?width=500";
    document.getElementById("imageTest").src = tate;
}

/* Change img to Planets when NOT hovering over img */
document.getElementById("imageTest").addEventListener("mouseout", noImgHover);

function noImgHover() {
    const planets = "https://media.istockphoto.com/photos/rendered-galaxy-space-scene-with-planets-picture-id1298997952?b=1&k=20&m=1298997952&s=170667a&w=0&h=DsD2R0U-Z6RZOAtoVH1pPVDvlAFMEgaZtqX-Y936zTo=";
    document.getElementById("imageTest").src = planets;
}

document.getElementById("rateButton").addEventListener("click", rButtonFunc);

function rButtonFunc() {
    document.getElementById("rateButton").innerHTML = "5 out of 5!";
}


/* Capitalizes "comment" when hovered over once */
document.getElementById("comment01").addEventListener("mouseout", commentFunc);

function commentFunc() {
    document.getElementById("comment01").innerHTML = "COMMENT!";
}

/* Actionlistiner for "commentSubmit" button */
document.getElementById("commentSubmitButton").addEventListener("click", commentButtonFunc);

function commentButtonFunc() {
    const result = "";
    
    if (document.getElementById("commentInput").notEmpty){
        result = "";
        document.getElementById("commentText").innerHTML = result;
    }
   
    /* Send "RESULT" variable to a DB or a textdocument */
}

/* Actionlistiner for "rateSubmit" button        I am so happy that I managed to make some functional JS x) */
document.getElementById("rateSubmitButton").addEventListener("click", rateButtonFunc);

function rateButtonFunc() {
    const result = 0;
    
    if (document.getElementById("oneStar").checked){
        result = 1;
        document.getElementById("dynamicText").innerHTML = "1 out of 3...";
    }

    else if (document.getElementById("twoStars").checked){
        result = 2;
        document.getElementById("dynamicText").innerHTML = "2 out of 3...";
    }

    else if (document.getElementById("threeStars").checked){
        result = 3;
        document.getElementById("dynamicText").innerHTML = "3 out of 3!";
    }
   
    /* Send "RESULT" variable to a DB or a textdocument */
}