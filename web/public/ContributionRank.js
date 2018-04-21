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