
        var config = {
            apiKey: "AIzaSyBD8z7IEJtKXhRQAe37Piad7moHD1JBBCY",
            authDomain: "spotter-6ba86.firebaseapp.com",
            databaseURL: "https://spotter-6ba86.firebaseio.com",
            projectId: "spotter-6ba86",
            storageBucket: "spotter-6ba86.appspot.com",
            messagingSenderId: "242336049467"
          };
        firebase.initializeApp(config);
        var database = firebase.database();
        var data = {};
        var markers = {};
        var timer;
        var timeRange=7200000;
        var map;


        function debugMode()
        {
            alert("Starting debug mode");
//            timeRange = 0;
            var date = new Date();
            var n = date.getTime();
            var count = 0;
            for (var i in data)
            {
                if(count < 3)
                {
                    data[i]["UploadTime"] =  n - 1700000;
                }
                else if( count > 3 && count < 6 )
                {
                    data[i]["UploadTime"] =  n - 3500000;
                }
                else if(count > 6)
                {
                    data[i]["UploadTime"] =  n - 7100000;
                }
                count++;
            }
            addAnnotation();
            clearTimeout(timer);
        }

        
        function initAutocomplete() 
        {
            getAllData();
            map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: {lat: 40.425, lng: -86.929},
                    mapTypeId: 'roadmap'
                });

            var input = document.getElementById('pac-input');
//            var timeRange = document.getElementById('time');
            var table = document.getElementById("markerTable");
            var closeTable = document.getElementById("closeTable");
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//            map.controls[google.maps.ControlPosition.TOP_LEFT].push(timeRange);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(closeTable);
            map.controls[google.maps.ControlPosition.RIGHT_TOP].push(table);
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            autocomplete.addListener('place_changed', function() {
                
                var place = autocomplete.getPlace();
                 if (!place.geometry) 
                 {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                 }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) 
                {
                    map.fitBounds(place.geometry.viewport);
                }
                else
                {
                    map.setCenter(place.geometry.location);
                    map.setZoom(15);  // Why 15? Because it looks good.
                }
                
                var placeMarker =  new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });    
            });
//            
        }
        function removeAllMarkers()
        {
            for (var i in markers)
            {
                markers[i].setMap(null);            
            }
        }
        function setTimeRange(time)
        {
            switch (time)
            {
                case 2:
                    document.getElementById("timeRange1hr").checked = false;
                    document.getElementById("timeRangeHalf").checked = false;
                    break;
                case 1:
                    document.getElementById("timeRange2hr").checked = false;
                    document.getElementById("timeRangeHalf").checked = false;
                    break;
                case 0.5:
                    document.getElementById("timeRange1hr").checked = false;
                    document.getElementById("timeRange2hr").checked = false;
                    break;
                default:
                    break;
            }
            
            timeRange = time*3600000;
            removeAllMarkers();
            markers={};
            addAnnotation();
        }
        function addAnnotation()
        {
            var marker;
            var count = 0;
            var date = new Date();
            var n = date.getTime();

            removeAllMarkers();     // reinitialize map
            
            var table = document.getElementById("markerTable");
            var tableHtml = "<table><tr><th>Number</th><th>Upload Time</th></tr>";
            
            for (var i in data)
            {
                
//                if(parseInt(data[i]["UploadTime"]) > n-timeRange)
//                {
                    markers[count] = new google.maps.Marker({
                        position: {lat: data[i]["Latitude"], lng: data[i]["Longitude"]},
                        map: map
                    });     
                    tableHtml = setTable(count, data[i]["UploadTime"], tableHtml);
//                }
                count++;
            }
            var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                                                                  });
            tableHtml+="</table>";
            table.innerHTML = tableHtml;
        }
        function setTable(count, uploadTime, tableHtml)
        {
            var date = new Date(uploadTime);
            var row = "<tr>" + 
                        "<td onclick=\"clickRow(" + count + ");\">" + count + "</td>" +
                        "<td onclick=\"clickRow(" + count + ");\">" + date.toTimeString() + "</td>" + 
                      "</tr>";
            tableHtml+=row;
            return tableHtml;
        }
        function clickRow(count)
        {
//            removeAllMarkers();
            
            map.setCenter(markers[count].getPosition());
            map.setZoom(17);
            clearTimeout(timer);
            
            for (var i in markers)
            {
                
                if(parseInt(i) != parseInt(count))
                {
                    markers[i] = new google.maps.Marker({
                        position: markers[i].getPosition(),
                        map: map
                    });     
                }
                else
                {
                    markers[parseInt(i)].setIcon("http://maps.google.com/mapfiles/ms/icons/yellow-dot.png");
                }
            }
            
        }
        function getData(id, path)
        {
              firebase.database().ref(path).once('value').then(
                    function(snapshot)
                    {
                         document.getElementById(id).innerHTML += (snapshot.val()); 
                    }
                );
        }
        function getAllData()
        {
            firebase.database().ref('/').once('value', 
                function(snapshot) 
                {
                    snapshot.forEach(
                        function(childSnapshot) 
                        {
                            var record = childSnapshot.key
                            var buff = {};
                            childSnapshot.forEach(
                                function(childSnapshot)
                                {
                                    var key = childSnapshot.key;
                                    var val = childSnapshot.val();
                                    buff[key] = val;
    //                                        window.alert(key + ' : ' + val);    
                                }
                            );

                            data[record] = buff;
                        }
                    );
                    addAnnotation();
                    timer = setTimeout(getAllData, 5000);
                }
            );
            
        }

        

        function closeTable()
        {
            document.getElementById("markerTable").style.visibility = "hidden";
            document.getElementById("closeTable").onclick = openTable;
            document.getElementById("closeTable").innerHTML = "Open Table"
            clearTimeout(timer);
        }
        function openTable()
        {
            document.getElementById("markerTable").style.visibility = "visible";
            document.getElementById("closeTable").onclick = closeTable;
            document.getElementById("closeTable").innerHTML = "Close Table"
            timer = setTimeout(getAllData, 5000);
        }
        function closing()
        {
            console.log("closing");
            firebase.app().delete();
            clearTimeout(timer);
        }
   