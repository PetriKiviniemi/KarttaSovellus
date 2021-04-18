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
    
    addPlace(formatCoord(65.0629891631731, 25.465280256359225), "Kun taivaalta sataa ties mitä ja kaipaat etelän lämpöön, on onneksesi kampuksen välittömässä läheisyydessä pieni pala tropiikkia. Kasvitieteellisessä puutarhassa voit pyörähtää tutkimassa aavikon kasvillisuutta tai viettää pidemmänkin ajan tutkimusmatkalla maailmamme ihmeellisimpiin ilmastoihin. Muista pakata eväät mukaan! ");
    addPlace(formatCoord(65.012615, 25.471453), "Oulun keskusta.");
    addPlace(formatCoord(65.05964117596208, 25.478542956359078), "Halusit sitten yhden tai useamman, Caiossa voit pistäytyä oli suunnitelmasi mikä tahansa. Tunnelmallinen baari ja sykähdyttävä tanssilattia tarjoavat parastaan opiskelijoille, myös hintojensa puolesta. Caion tapahtumatarjontaa kannattaa pitää silmällä, sillä sieltä löytyy jokaiselle jotakin; keikkoja, stand uppia, burleskia, opiskelijabileitä...")
    addPlace(formatCoord(65.02274092404251, 25.4886057753909), "Tuiran uimaranta ulottuu hiekkaa laajemmalle alueelle, joka on jälleen oiva paikka viettää aikaa yksin, yhdessä tai Pirkka-oluen kanssa. Mikäs siinä tuiran uimarannalla kesäpäivää vietellessä, kun löytyy hiekkarantaa, rantalentiskenttää, nurmikkoa, kahvilo, laituri ja kelluva sauna. Saunalauttaa pyörittävät kesällä vapaaehtoiset, kertamaksu vitosen ja saunasta hyppy raikkaaseen jokeen. Talvella Tuirasta löytyy lämpimät pukukopit ja avanto.")
    addPlace(formatCoord(65.02029682549218, 25.461877377041652), "Kuusisaaren uusi ilme tarjoaa kauniin luonnon sijasta hehtaarin verran pussikaljottelutilaa. Grillipaikalle saattaa joutua kärkkymään muutaman tunnin varsinkin kesäisin, mutta odotellessa voi pelailla koripalloa, loikoilla hiekkarannalla tai urheilla ulkoilmakuntosalilla! Satunnaisina viikonloppuina saari rajataan festivaalien käyttöön. Meillä opiskelijoilla ole valitettavasti varaa lippuihin, eli ei siitä sen enempää.")
    addPlace(formatCoord(65.01393754607543, 25.47016126800521), "Kun tarvitset oikeasti apua, etkä ole lähellä kampusta ja sen tarjoamaa neuvontaa, voit suunnata Oulu10:iin. Täältä saat palvelua mm. bussikorttiin ja OuluCardiin liittyvissä asioissa.")
    addPlace(formatCoord(65.01895208987762, 25.478030841044863), "Kaiken kansan puisto toimii alustana lähes kaikenlaiselle juopott.. vapaa-ajan toiminnalle. Kesät talvet voi Ainolanpuistossa ulkoilla, istuskella, grillailla, kiipeillä puihin tai leikkiä leikkipuistossa. Lisäksi puistosta löytyy pieni kasvitieteellinen puutarha, Pohjois-Pohjanmaan museo sekä Oulun taidemuseo. Kesäisin myös kahvila Kiikku sekä Hupisaarten kesäteatteri.")
    addPlace(formatCoord(65.01703872017998, 25.470152943040603), "Sopivasti pyöräbaanan varrelle sijoittuva Linnansaari on täydellinen auringonlaskun valvontapaikka. Nurtsilla loikoilun ja eväiden napostelun lisäksi saaren yläpäästä löytyy kuuluisa Tähtitornin Kahvila ja alapäästä Wakepark ja upouusi vesipuisto. Talvella saari on täysin hyödytön.")

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