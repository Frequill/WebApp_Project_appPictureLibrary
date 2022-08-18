//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

// To use ES6 modules, export and import, you need to create a package.json and set the type ot module.
// - open a terminal in your script directory and type: npm init -y
// - open the package file and add the line at the top: "type":"module", 

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

import {prototypeAlbum, prototypePicture, uniqueId} from './picture-album-prototypes.js';

const pictureDir = "app-data/library/pictures";


//All images and image comments are curtesy of Nasa and can be found at their incredible gallery ar https://www.nasa.gov/multimedia/imagegallery/index.html
//Usage and copyright according to https://www.nasa.gov/multimedia/guidelines/index.html
class albumsTemplate {

    static NASA() {
        return [

            //properties needs to be writable and enumaberable to be able to use JSON.stringify(..)
            Object.create(prototypeAlbum,
                {
                    id: { value: uniqueId(), writeable: true, enumerable: true },
                    title: { value: "Galaxies", writeable: true, enumerable: true },
                    comment: { value: "There are inifinte of them in the universe", writeable: true, enumerable: true },
                    path: { value: `${pictureDir}/galaxies`, writeable: true, enumerable: true },
                    headerImage: { value: `${pictureDir}/album-header/PIA04921~small.jpg`, writeable: true, enumerable: true },
                    pictures: { value: picturesTemplate.galaxies(), writeable: true, enumerable: true }
                }),

            Object.create(prototypeAlbum,
                {
                    id: { value: uniqueId(), writeable: true, enumerable: true },
                    title: { value: "Nebulas", writeable: true, enumerable: true },
                    comment: { value: "Image that a cloud of gas could be this beautiful", writeable: true, enumerable: true },
                    path: { value: `${pictureDir}/nebulas`, writeable: true, enumerable: true },
                    headerImage: { value: `${pictureDir}/album-header/GSFC_20171208_Archive_e000383~small.jpg`, writeable: true, enumerable: true },
                    pictures: { value: picturesTemplate.nebulas(), writeable: true, enumerable: true }
                }),

            Object.create(prototypeAlbum,
                {
                    id: { value: uniqueId(), writeable: true, enumerable: true },
                    title: { value: "Newborn stars", writeable: true, enumerable: true },
                    comment: { value: "A star is born", writeable: true, enumerable: true },
                    path: { value: `${pictureDir}/newborn-stars`, writeable: true, enumerable: true },
                    headerImage: { value: `${pictureDir}/album-header/A Galactic Spectacle_4862916839_o~small.jpg`, writeable: true, enumerable: true },
                    pictures: { value: picturesTemplate.newbornStars(), writeable: true, enumerable: true }
                }),
            Object.create(prototypeAlbum,
                {
                    id: { value: uniqueId(), writeable: true, enumerable: true },
                    title: { value: "Planets", writeable: true, enumerable: true },
                    comment: { value: "Checkout some amazing pictures of our neighbours", writeable: true, enumerable: true },
                    path: { value: `${pictureDir}/planets`, writeable: true, enumerable: true },
                    headerImage: { value: `${pictureDir}/album-header/hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg`, writeable: true, enumerable: true },
                    pictures: { value: picturesTemplate.planets(), writeable: true, enumerable: true }
                }),
            Object.create(prototypeAlbum,
                {
                    id: { value: uniqueId(), writeable: true, enumerable: true },
                    title: { value: "Hubble telescope", writeable: true, enumerable: true },
                    comment: { value: "All the pictures were taken by this amazing telescope", writeable: true, enumerable: true },
                    path: { value: `${pictureDir}/hubble-telescope`, writeable: true, enumerable: true },
                    headerImage: { value: `${pictureDir}/album-header/GSFC_20171208_Archive_e002151~small.jpg`, writeable: true, enumerable: true },
                    pictures: { value: picturesTemplate.hubbleTelescope(), writeable: true, enumerable: true }
                })
        ];
    }
}

class picturesTemplate {

    //properties needs to be writable and enumaberable to be able to use JSON.stringify(..)
    static hubbleTelescope() {
        return [
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "History of Hubble Space Telescope (HST)", writable: true, enumerable: true },
                    comment: {
                        value: "Ready for transportation to the Kennedy Space Center, the Hubble Space Telescope (HST) " +
                            "is pictured onboard the strongback dolly at the Vertical Processing Facility (VPF) at the Lockheed " +
                            "assembly plant upon completion of final testing and verification."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "8913467~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "8913467~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId() },
                    title: { value: "History of Hubble Space Telescope (HST)", writable: true, enumerable: true },
                    comment: {
                        value: "The Hubble Space Telescope (HST) pictured in the Vertical Processing Facility (VPF) support fixture " +
                            "during final testing and verification at the Lockheed assembly plant."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "8913468~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "8913468~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Space Telescope", writable: true, enumerable: true },
                    comment: {
                        value: "The Hubble Space Telescope in a picture snapped by a Servicing Mission 4 crewmember just after the Space Shuttle Atlantis " +
                            "captured Hubble with its robotic arm on May 13, 2009, beginning the mission to upgrade and repair the telescope. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e002151~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e002151~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Making Room for Hubble's New Camera", writable: true, enumerable: true },
                    comment: {
                        value: "Astronaut Jeffrey Hoffman removes the Wide Field and Planetary Camera 1 (WFPC 1) during the first Hubble servicing mission (SM1), " +
                            "which took place in December, 1993"
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA22574~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA22574~orig.jpg", writable: true, enumerable: true }
                })
        ];
    }
    static planets() {
        return [
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Takes Mars Portrait Near Close Approach", writable: true, enumerable: true },
                    comment: {
                        value: "Mars is looking mighty fine in this portrait nabbed by the Hubble Space Telescope on a near close approach. " +
                            "The Hubble Space Telescope is more well known for its picturesque views of nebulae and galaxies, " +
                            "but it's also useful for studying our own planets, including Mars."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000332~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000332~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Captures Vivid Auroras in Jupiter’s Atmosphere", writable: true, enumerable: true },
                    comment: {
                        value: "Astronomers are using the NASA/ESA Hubble Space Telescope to study auroras " +
                            "— stunning light shows in a planet’s atmosphere — on the poles of the largest planet in the solar system, Jupiter. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "hubble-captures-vivid-auroras-in-jupiters-atmosphere_28000029525_o~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Takes Mars Portrait Near Close Approach", writable: true, enumerable: true },
                    comment: {
                        value: "Mars is looking mighty fine in this portrait nabbed by the Hubble Space Telescope on a near close approach. " +
                            "The Hubble Space Telescope is more well known for its picturesque views of nebulae and galaxies, " +
                            "but it's also useful for studying our own planets, including Mars."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000332~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000332~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Observes a New Saturn Storm", writable: true, enumerable: true },
                    comment: {
                        value: "Hubble Observes a New Saturn Storm", writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA05982~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA05982~orig.jpg", writable: true, enumerable: true }
                })
        ];
    }
    static newbornStars() {
        return [
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "A Galactic Spectacle", writable: true, enumerable: true },
                    comment: {
                        value: "NASA image release August 5, 2010 A beautiful new image of two colliding galaxies has been released by NASA's Great Observatories."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "A Galactic Spectacle_4862916839_o~orig.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "A Galactic Spectacle_4862916839_o~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble reveals heart of Lagoon Nebula", writable: true, enumerable: true },
                    comment: {
                        value: "A spectacular new NASA/ESA Hubble Space Telescope image reveals the heart of the Lagoon Nebula. Seen as a massive cloud of " +
                            "glowing dust and gas, bombarded by the energetic radiation of new stars, this placid name hides a dramatic reality."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e001955~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e001955~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Stellar Snowflake Cluster", writable: true, enumerable: true },
                    comment: {
                        value: "Newborn stars, hidden behind thick dust, are revealed in this image of a section of the Christmas Tree cluster from " +
                            "NASA Spitzer Space Telescope, created in joint effort between Spitzer infrared array camera and multiband imaging photometer instrument."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA03244~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA03244~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Sees a Horsehead of a Different Color", writable: true, enumerable: true },
                    comment: {
                        value: "Backlit wisps along the Horsehead Nebula upper ridge are being illuminated by Sigma Orionis, " +
                            "a young five-star system just off the top of this image from the Hubble Space Telescope."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA16008~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA16008~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Sees the Force Awakening in a Newborn Star", writable: true, enumerable: true },
                    comment: {
                        value: "In the center of this image from the Hubble Space Telescope, partially obscured by a dark cloud of dust, " +
                            "a newborn star shoots twin jets out into space as a sort of birth announcement to the universe."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA16022~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA16022~orig.jpg", writable: true, enumerable: true }
                })
        ];
    }
    static nebulas() {
        return [
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "History of Hubble Space Telescope (HST)", writable: true, enumerable: true },
                    comment: {
                        value: "This is a color Hubble Space Telescope (HST) heritage image of supernova remnant N49, a neighboring galaxy, " +
                            "Ïthat was taken with Hubble's Wide Field Planetary Camera 2. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "0301627~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "0301627~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Peers into the Storm", writable: true, enumerable: true },
                    comment: {
                        value: "Backlit wisps along the Horsehead Nebula upper ridge are being illuminated by Sigma Orionis, " +
                            "a young five-star system just off the top of this image from the Hubble Space Telescope."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000226~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000226~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Hubble Sees a Star ‘Inflating’ a Giant Bubble`, writable: true, enumerable: true },
                    comment: {
                        value: "For the 26th birthday of NASA’s Hubble Space Telescope, astronomers are highlighting a " +
                            "Hubble image of an enormous bubble being blown into space by a super-hot, massive star."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000383~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000383~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Hubble Finds a Little Gem`, writable: true, enumerable: true },
                    comment: {
                        value: "This colorful bubble is a planetary nebula called NGC 6818, also known as the Little Gem Nebula. " +
                            "It is located in the constellation of Sagittarius (The Archer), roughly 6,000 light-years away from us. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000657~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000657~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Hubble Captures Cosmic Ice Sculptures`, writable: true, enumerable: true },
                    comment: {
                        value: "NASA image release September 16, 2010 Enjoying a frozen treat on a hot summer day can leave a sticky " +
                            "mess as it melts in the Sun and deforms. In the cold vacuum of space, there is no edible ice cream, but there " +
                            "is radiation from massive stars that is carving away at cold molecular clouds, creating bizarre, fantasy-like structures. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e001963~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e001963~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble Captures View of Mystic Mountain", writable: true, enumerable: true },
                    comment: {
                        value: "NASA Hubble Space Telescope captures the chaotic activity atop a three-light-year-tall pillar of gas and dust that " +
                            "is being eaten away by the brilliant light from nearby bright stars in a tempestuous stellar nursery called the Carina Nebula."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA15985~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA15985~orig.jpg", writable: true, enumerable: true }
                })
        ];
    }
    static galaxies() {
        return [
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "History of Hubble Space Telescope (HST)", writable: true, enumerable: true },
                    comment: {
                        value: "The razor sharp eye of the Hubble Space Telescope (HST) easily resolves the Sombrero galaxy, Messier 104 (M104). " +
                            "50,000 light-years across, the galaxy is located 28 million light-years from Earth at the southern edge of the rich Virgo cluster of galaxies. " +
                            "Equivalent to 800 billion suns, Sombrero is one of the most massive objects in that group."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "0700064~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "0700064~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: "Hubble's Glittering Frisbee Galaxy", writable: true, enumerable: true },
                    comment: {
                        value: "This image from Hubble’s Wide Field Camera 3 (WFC3) shows a section of NGC 1448, " +
                            "a spiral galaxy located about 50 million light-years from Earth in the little-known constellation " +
                            "of Horologium (The Pendulum Clock)."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e000117~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e000117~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `NASA's Hubble Celebrates 21st Anniversary with "Rose" of Galaxies`, writable: true, enumerable: true },
                    comment: {
                        value: "To celebrate the 21st anniversary of the Hubble Space Telescope's deployment into space, astronomers " +
                            "at the Space Telescope Science Institute in Baltimore, Md., pointed Hubble's eye at an especially photogenic " +
                            "pair of interacting galaxies called Arp 273. "
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "GSFC_20171208_Archive_e001885~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "GSFC_20171208_Archive_e001885~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Andromeda Galaxy`, writable: true, enumerable: true },
                    comment: {
                        value: "This image is from NASA Galaxy Evolution Explorer is an observation of the large galaxy in Andromeda, Messier 31. " +
                            "The Andromeda galaxy is the most massive in the local group of galaxies that includes our Milky Way."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA04921~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA04921~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Eyes in the Sky`, writable: true, enumerable: true },
                    comment: {
                        value: "NASA Hubble and Spitzer telescopes combined to make these shape-shifting galaxies taking on the form of a giant mask. " +
                            "The icy blue eyes are actually the cores of two merging galaxies, called NGC 2207 and IC 2163, " +
                            "and the mask is their spiral arms."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA08097~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA08097~orig.jpg", writable: true, enumerable: true }
                }),
            Object.create(prototypePicture,
                {
                    id: { value: uniqueId(), writable: true, enumerable: true },
                    title: { value: `Hubble Spies Spectacular Sombrero`, writable: true, enumerable: true },
                    comment: {
                        value: "Lying at the southern edge of the rich Virgo cluster of galaxies, Messier 104, also called the Sombrero galaxy, " +
                            "is one of the most famous objects in the sky in this image from NASA Hubble Space Telescope."
                        , writable: true, enumerable: true
                    },
                    imgLoRes: { value: "PIA15226~small.jpg", writable: true, enumerable: true },
                    imgHiRes: { value: "PIA15226~orig.jpg", writable: true, enumerable: true }
                })
        ];
    }
}

//debugging only
/*
const albums = albumsTemplate.NASA();

console.group('list all albums and picture ')
console.log(`\Template contains ${albums.length} albums(s):`)
for (const album of albums) {
    console.log('--- Album -----\n' + album);

    console.log(`\n${album.pictures.length} picture(s) in album:`)
    for (const picture of album.pictures) {
        console.log('\n' + picture);
    }
    console.log('---------------\n');
}
console.groupEnd();
*/

export {pictureDir, albumsTemplate, picturesTemplate};