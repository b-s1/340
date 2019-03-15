function updateHouse(id){
  var nameCheck = document.forms["update-house"]["name"].value;
  console.log(nameCheck);

  if(nameCheck == ''){
    alert("Please enter the House name");
  }

  else {
    $.ajax({
        url: '/houses/' + id,
        type: 'PUT',
        data: $('#update-house').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
  }
};
