function updateHouse(id){
    $.ajax({
        url: '/houses/' + id,
        type: 'PUT',
        data: $('#update-house').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
