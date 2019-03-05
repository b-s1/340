function filterPeopleByHomeland() {
    //get the id of the selected homeworld from the filter dropdown
    var homeland_id = document.getElementById('homeland_filter').value
    //construct the URL and redirect to it
    window.location = '/characters/filter/' + parseInt(homeland_id)
}