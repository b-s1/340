function deleteHouse(id){
    $.ajax({
        url: '/houses/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteCharacterHouse(character_id, house_id){
    $.ajax({
        url: '/house_members/character_id/' + character_id + '/house_id/' + house_id,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined){
              alert(result.responseText)
            }
            else {
              window.location.reload(true)
            }
        }
    })
  };
