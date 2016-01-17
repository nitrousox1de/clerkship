var listOfSites = {
    "cities": [
      "cname": "Arlington",
      "lat": "42.4153",
      "lng": "-71.1569",
      "monday": "2",
      "tuesday": "3"
    }];

// GLOBAL VARIABLES
var map = null;
var dms = null; // Distance matrix service
var geocoder = null;

var cs = [];

/* ===============
func: setEventListener

Sets event listener for each map marker.  Uses function call to create separate instance each time
================ */
function setEventListener(map, marker, infowindow){
    google.maps.event.addListener(marker, 'click', function() {
    map_recenter(marker.getPosition(),-200, 0);
    for (i = 0; i < cs_infowindow.length; i++){
      cs_infowindow[i].close();
    }
    infowindow.open(map,marker);
    });
}


/* ===============
func: initialize

Initializes the map, centers on Boston, and requests LatLng positions of
all sites in the list of sites provided.
Initializes:    Map service
                Distance Matrix service
=============== */
function initialize(){
    map_center = {
        center: { lat: 42.304506, lng: -69.9500},
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), 
                              map_center);
    dms = new google.maps.DistanceMatrixService();
    geocoder = new google.maps.Geocoder();
    
    for (i = 0; i < listOfSites.cities.length; i++) { // Create LatLng object for each site
        tmpContentString = "test";
        tmplatlng = new google.maps.LatLng(listOfSites.cities[i].lat, listOfSites.cities[i].lng);
        tmp = {
          latlng: tmplatlng,
          contentString: tmpContentString,
          infowindow: new google.maps.InfoWindow({content: tmpContentString}),
          marker: new google.maps.Marker({
                    position: tmplatlng,
                    map: map,
                    title: listOfSites.cities[i].cname});
        }
        cs.push(tmp);
        setEventListener(map, tmp.marker, tmp.infowindow)
    }

}