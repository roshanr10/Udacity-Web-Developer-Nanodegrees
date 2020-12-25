var locations = [],
    // Init. Variables for Map
    map,
    center,
    bounds,
    // Prepare Info 
    infowindow,
    // Init. Variables for Foursquare API 
    client_id = "SYVT2EFOMEFMXTQ4NZOHTTT1JMHQBYMYZCNETSDA0FVOFIEO",
    client_secret = "BP0RHAI1ZLCA4SZOCYTUUP4SNRA3QHOJDZRSYU2AP0UBCHR1",
    version = "20151121", // YYYYMMDD Format
    initLocation = "Boston",
    searchLimit = 10,
    // Init. viewModel for Knockout's MVVM Architecture
    viewModel = {
        locations: ko.observableArray(),
        query: ko.observable(''),
        search: search,
        show: showInfo,
        title: ko.observable(),
        rating: ko.observable(),
        tip: ko.observable(),
        url: ko.observable(),
        open: ko.observable(),
        location: ko.observable(initLocation)
    };

ko.applyBindings(viewModel);
viewModel.query.subscribe(viewModel.search);

function initMap() {
    loadPointsAsync();
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        scrollwheel: false
    });
    // Create bounds object to aid in cropping map to points on map
    bounds = new google.maps.LatLngBounds();
    google.maps.event.addDomListener(window, 'resize', function() {
        setBounds();
    });
}

function loadPointsAsync() {
    // Fetch Points over AJAX
    $.getJSON("https://api.foursquare.com/v2/venues/explore?" +
        "client_id=" + client_id + "&" + "client_secret=" +
        client_secret + "&" + "v=" + version + "&" + "near=" +
        initLocation + "&" + "limit=" + searchLimit + "&", function(
            data) {
            // Load points into array
            for (var x in data.response.groups[0].items) {
                locations.push({
                    position: {
                        lat: data.response.groups[0].items[x].venue
                            .location.lat,
                        lng: data.response.groups[0].items[x].venue
                            .location.lng
                    },
                    title: data.response.groups[0].items[x].venue
                        .name,
                    tip: data.response.groups[0].items[x].tips[
                        0].text,
                    url: data.response.groups[0].items[x].venue
                        .url,
                    rating: data.response.groups[0].items[x].venue
                        .rating,
                    open: data.response.groups[0].items[x].venue
                        .hours.isOpen
                });
            }
            // Sort locations by name
            locations.sort(function compare(a, b) {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            // Return copy of locations array to viewModel
            viewModel.locations(locations.slice());
            // Create Markers
            loadMarkers();
        }).fail(function() {
        // Gracefully handle when API cannot be accessed
        alert(
            "The locations could not be loaded due to network connectivity issues. Please try again later."
        );
    });
}

function loadMarkers() {
    // Iterate through All Locations within Array
    locations.forEach(function(pos, i) {
        // Create Map Marker
        pos.marker = new google.maps.Marker({
            map: map,
            position: pos.position,
            title: pos.title
        });
        // Set default icon for map marker
        setDefaultIcon(pos);
        // Listen for Click Event on Marker
        pos.marker.addListener('click', function() {
            showInfo(pos);
        });
        // Add Marker to Bounds
        bounds.extend(pos.marker.getPosition());
    });
    // Crop map around markers
    setBounds();
}

function showInfo(pos) {
    // Close any existing infowindow
    if (infowindow != undefined) {
        infowindow.close();
        setDefaultIcon(lastpos);
    }
    // Impose selected state on current marker
    pos.marker.setIcon({
        url: 'images/selected.png'
    });
    // Push selected location's data to viewModel
    viewModel.title(pos.title);
    viewModel.rating(pos.rating);
    viewModel.url(pos.url);
    viewModel.tip(pos.tip);
    viewModel.open(pos.open);
    // Generate Info Windiw
    infowindow = new google.maps.InfoWindow({
        content: document.getElementById('infowindow').innerHTML
    });
    // Save marker, so the icon can be reverted afterwards
    lastpos = pos;
    // Revert icon on close
    infowindow.addListener('closeclick', function() {
        setDefaultIcon(pos);
    });
    // Open templated infowindow
    infowindow.open(map, pos.marker);
}

function setDefaultIcon(pos) {
    // Show open icon if location is currently open
    if (pos.open) {
        pos.marker.setIcon({
            url: 'images/open_now.png'
        });
    }
    // Show standard icon if location is closed or data has not been provided
    else {
        pos.marker.setIcon({
            url: 'images/unselected.png'
        });
    }
}

function setBounds() {
    // Crop Map Around Markers
    if (center) map.setCenter(center);
    map.fitBounds(bounds);
    if (!center) center = map.getCenter();
}

function search(value) {
    var count = 0;
    // Remove all the current locations, which removes them from the view
    viewModel.locations.removeAll()
        // Iterate through all locations and see if search query matches location
    for (var x in locations) {
        if (locations[x].title.toLowerCase().indexOf(value.toLowerCase()) >=
            0 || locations[x].tip.toLowerCase().indexOf(value.toLowerCase()) >=
            0) {
            // Show Matching Locations
            locations[x].marker.setVisible(true);
            viewModel.locations.push(locations[x]);
            count++;
        } else {
            locations[x].marker.setVisible(false);
        }
    }
}