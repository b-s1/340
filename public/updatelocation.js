function updateLocation(id){
  var nameCheck = document.forms["update-location"]["name"].value;
  console.log(nameCheck);

  if(nameCheck == ''){
    alert("Please enter the location's name");
  }

  else {
    $.ajax({
        url: '/locations/' + id,
        type: 'PUT',
        data: $('#update-location').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
  }
};
