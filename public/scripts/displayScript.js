
function displayTable() {
    var loc_name = document.getElementById('name').value;
    var pop = document.getElementById('population').value;

    var source   = document.getElementById('text-template').innerHTML;
    var template = Handlebars.compile(source);
    var context = {
        results:[{name: loc_name, population: pop},
                {name: "Test", population: 10}]
    };

    var html = template(context);

    document.getElementById('result').innerHTML = html;
}

document.getElementById('add-char').addEventListener('click', displayTable);

//search for characters in table
//Adapted from http://jsfiddle.net/dfsq/7BUmG/1133/
var $rows = $('#table tr');
$('#search').keyup(function(){
    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b)') + ').*$',
      reg = RegExp(val, 'i'),
      text;

      $rows.show().filter(function(){
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
      }).hide();
});
