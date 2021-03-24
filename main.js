// Initialize and add the map
function initMap() {
    // The location of Uluru
    const oulu = { lat: 65.012615, lng: 25.471453 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: oulu,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: oulu,
      map: map,
    });
}