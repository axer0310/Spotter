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

function setHTML()
{
    //From https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    var items = Object.keys(data).map(function(key) {
    return [key, data[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    // Create a new array with only the first 5 items
    console.log(items.slice(0, 5));
    //==========================================
    
    
    
    
    //Ranking
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
            if( i < items.length)
            {
                  document.getElementById("ranking" + (i+1).toString() ).innerHTML = "<i class=\"fa fa-fw w3-margin-right w3-xxlarge\">" + (i+1).toString() + "</i>" + items[i][0];    
            }
            else
            {
                document.getElementById("ranking" + (i+1).toString() ).innerHTML = "<i class=\"fa fa-fw w3-margin-right w3-xxlarge\">" + (i+1).toString() + "</i>" + "None";    
            }
        }
    }
    
    
    //Contribution
    for(var i = 0; i< 10;i++)
    {
        if(i == 0)
        {
            if(typeof(items[i][0]) != 'undefined')
            {
                var width = parseFloat((parseInt(items[i][1]) / items.length) *100).toString();
                document.getElementById("contribution1Name").innerHTML = "<b><i class=\"fa fa-certificate fa-fw w3-margin-right w3-xxlarge\"></i>" + items[0][0] + "</b>";
                document.getElementById("contribution1Num").innerHTML = "<div class=\"w3-container w3-center w3-round-xlarge w3-teal\" style=\"width:" + width +"%\">" + "<div class=\"w3-center w3-text-white\" >" + items[0][1] + "</div></div>";
            }
        }
        else
        {
            if( i<items.length )
            {
                
                var width = parseFloat((parseInt(items[i][1]) / items.length) *100).toString();
                document.getElementById("contribution" + (i+1).toString()  + "Name").innerHTML = items[i][0];
                
                document.getElementById("contribution" + (i+1).toString() + "Num").innerHTML = "<div class=\"w3-container w3-center w3-round-xlarge w3-teal\" style=\"width:" + width +"%\">" + items[i][1] + "</div>";
                
            }
            else
            {
                var width = 0;
                document.getElementById("contribution" + (i+1).toString() + "Name").innerHTML = "None";
                document.getElementById("contribution" + (i+1).toString() + "Num").innerHTML = "<div class=\"w3-container w3-center w3-round-xlarge w3-teal\" style=\"width:" + width +"%\">" + 0 + "</div>";
                   
            }
            
        }
    }
}

