var database = firebase.database();
var data = {};
function getUserId()
{
    firebase.database().ref('/').once('value', 
                function(snapshot) 
                {
                    snapshot.forEach(
                        function(childSnapshot) 
                        {
//                            var record = childSnapshot.key
                            var buff = {};
                            childSnapshot.forEach(
                                function(childSnapshot)
                                {
                                    var key = childSnapshot.key;
                                    var val = childSnapshot.val();
                                    if(key == "UserId")
                                    {
                                        if(val != "")
                                        {
                                            if(data.hasOwnProperty(val))
                                            {
                                                data[val] += 1;
                                            }
                                            else
                                            {
                                                data[val] = 0;
                                            }    
                                        }
                                        
                                    }
                                }
                            );
                        }
                    );
                }
            );
}
function sortNumber(a,b) {
   return a - b;
}
function setHTML()
{
    
    var items = Object.keys(data).map(function(key) {
    return [key, data[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    // Create a new array with only the first 5 items
    console.log(items.slice(0, 5));

    
    
    for(var i = 0; i< 10;i++)
    {
        if(i == 0)
        {
            if(typeof(items[i][0]) != 'undefined')
            {
                document.getElementById("ranking1").innerHTML = "<i class=\"fa fa-certificate fa-fw w3-margin-right w3-xxlarge material-icons\" >1</i>" + items[0][0];    
            }
        }
        else
        {
            if( typeof(items[i][0]) != undefined )
            {
                  document.getElementById("ranking" + i).innerHTML = "<i class=\"fa fa-fw w3-margin-right w3-xxlarge\">" + i+1 + "</i>" + items[i][0];    
            }
        }
    }
}

