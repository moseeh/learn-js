import { places } from "./where-do-we-go.data.js";

let scroll = window.scrollY;
const location = document.createElement("a");
location.classList.add("location");
document.body.appendChild(location);

document.addEventListener("DOMContentLoaded", explore);
document.addEventListener("scroll", updateDirection);

function explore() {
    places.sort(compareCoordinates);
    places.forEach(createSection);

    const compass = document.createElement("div");
    compass.classList.add("direction");
    document.body.appendChild(compass);

    selectPlace();
}

function createSection(place) {
    const section = document.createElement("section");
    const imageUrl = `./where-do-we-go_images/${place.name.toLowerCase().replace(/ /g, "-")}.jpg`;

    // Check if the image exists
    const img = new Image();
    img.src = imageUrl;

    img.onload = function () {
        section.style.background = `url('${imageUrl}') center/cover no-repeat`;
    };

    img.onerror = function () {
        section.style.background = `url('./default-image.jpg') center/cover no-repeat`; // fallback image
    };

    section.style.height = "100vh";
    document.body.appendChild(section);
}


function selectPlace() {
    const index = Math.floor((window.scrollY + window.innerHeight / 2) / window.innerHeight);
    const place = places[index];

    location.textContent = `${place.name}\n${place.coordinates}`;
    location.href = `https://www.google.com/maps/place/${encodeURIComponent(place.coordinates)}`;
    location.target = "_blank";
    location.style.color = place.color;
}

function updateDirection() {
    const direction = document.querySelector(".direction");
    direction.textContent = scroll > window.scrollY ? "N" : "S";
    scroll = window.scrollY;

    selectPlace();
}

function compareCoordinates(a, b) {
    const parseLat = str => {
        let [degrees, direction] = str.split("°");
        return (direction.includes("S") ? -1 : 1) * parseFloat(degrees);
    };

    return parseLat(b.coordinates) - parseLat(a.coordinates);
}

export { explore };
