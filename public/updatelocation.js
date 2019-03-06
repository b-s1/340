function updateLocation(id){
    $.ajax({
        url: '/locations/' + id,
        type: 'PUT',
        data: $('#update-location').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
