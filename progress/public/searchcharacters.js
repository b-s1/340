function searchCharactersByFirstName() {
    //get the first name 
    var first_name_search_string  = document.getElementById('first_name_search_string').value
    //construct the URL and redirect to it
    window.location = '/characters/search/' + encodeURI(first_name_search_string)
}