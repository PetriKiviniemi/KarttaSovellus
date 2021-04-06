//Global var for state management

var locations = [];
var infoWindows = [];

function addPlace(coordinates, text)
{
  locations.push({
    key: coordinates,
    value: text
  });
}

function formatCoord(x, y)
{
  //e.g 65.0629891631731, 25.465280256359225
  return {lat: x, lng: y}
}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const oulu = { lat: 65.012615, lng: 25.471453 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: oulu,
    });
    
    addPlace(formatCoord(65.0629891631731, 25.465280256359225), "Täällä kasvaa kasveja.");
    addPlace(formatCoord(65.012615, 25.471453), "Oulun keskusta.");
    addPlace(formatCoord(65.05964117596208, 25.478542956359078), "Caio ravintola/baari, opiskelijoiden suosima sosiaalinen tila.")
    addPlace(formatCoord(65.05523594247678, 25.471618099258713), "Linnanmaan liikuntahalli. Opiskelijoille edullinen ja monipuolinen kunnonkasvatus paikka.")
    addPlace(formatCoord(65.05975781264628, 25.491914929370186), "Kaijon Kipsa. Jos mielesi tekee kebabbia tai muuta herkullista pureskeltavaa, suuntaa tiesi tänne.")
    addPlace(formatCoord(65.02274092404251, 25.4886057753909), "Tuiran uimaranta on mukava paikka viettää aikaa kesällä muiden opiskelijoiden kanssa, tai talvella käydä vaikka avantouinnilla.")
    addPlace(formatCoord(65.02029682549218, 25.461877377041652), "Kuusisaaressa on tunnelmaa.")
    addPlace(formatCoord(65.01393754607543, 25.47016126800521), "Oulu10 löydät kaiken tarvittavan tiedon julkisesta liikenteestä, kuin myös bussikortit.")
    addPlace(formatCoord(65.01895208987762, 25.478030841044863), "Ainolan puisto on viihtyisä ja rentouttava paikka oleskella raskaan työpäivän jälkeen.")

    //Iterate dict keys and create markers for every location
    for(let i = 0; i < locations.length; i++)
    {
      console.log(locations[i].key)
      this.createMarker(locations[i].key, map, locations[i].value)
    }
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

  infoWindows.push(infoWindow);

  marker.addListener("click", () => {
    //Close other infoWindows
    for(let i = 0; i < infoWindows.length; i++)
    {
      infoWindows[i].close();
    }
    infoWindow.open(map, marker);
  });
  return marker
}

function switchTab(event, tabName)
{
  //Hide the other screens, and display the desired screen
  screens = document.getElementsByClassName("content-screen");
  for(let i = 0; i < screens.length; i++)
  {
    screens[i].style.display = "none";
  }

  navButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].className = navButtons[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

function initTabs(){
  //Only display the main screen's content
  screens = document.getElementsByClassName("content-screen");
  for(let i = 0; i < screens.length; i++)
  {
    screens[i].style.display = "none";
  }
  document.getElementById("map").style.display = "block";
  navButtons = document.getElementById("nav-1");
  navButtons.className += " active";
}


//Info-popup / modal

function popupClick() {
  var infoPopup = document.getElementById("info-popup");
  infoPopup.style.display = 'block';
}

function closePopup()
{
  var infoPopup = document.getElementById("info-popup");
  infoPopup.style.display = 'none';
}

window.onclick = function(evt){
  var infoPopup = document.getElementById("info-popup");
  if(evt.target == infoPopup)
  {
    infoPopup.style.display = 'none';
  }
}