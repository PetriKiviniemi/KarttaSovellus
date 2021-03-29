//var ib = new InfoBox();

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const oulu = { lat: 65.012615, lng: 25.471453 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: oulu,
    });

    const ouluTxt = "Oulu on paras paikka! :-)";

    // The marker, positioned at Uluru
    const marker = this.createMarker(oulu, map, ouluTxt);
}

function createMarker(loc, map, contentStr){
  
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
  });
  
  //Create info box for marker
  var infoBox = document.createElement("div");
  infoBox.className = 'info-box';
  infoBox.innerHTML = marker

  const infoWindow = new google.maps.InfoWindow({
    content: contentStr,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
  return marker
}