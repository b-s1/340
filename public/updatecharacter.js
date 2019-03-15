function updateCharacter(id){
  var nameCheck = document.forms["update-character"]["fname"].value;
  console.log(nameCheck);

  if(nameCheck == ''){
    alert("Please enter a first name");
  }

  else{
    $.ajax({
        url: '/characters/' + id,
        type: 'PUT',
        data: $('#update-character').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
  }
};
