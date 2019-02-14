
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

document.getElementById('addLoc').addEventListener('click', displayTable);
