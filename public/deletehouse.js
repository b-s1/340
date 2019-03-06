function deleteHouse(id){
    $.ajax({
        url: '/houses/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
