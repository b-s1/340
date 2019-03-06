function deleteLocation(id){
    $.ajax({
        url: '/locations/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
