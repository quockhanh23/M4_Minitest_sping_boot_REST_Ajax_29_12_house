function getAllHouse() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/",
        success: function (data) {
            console.log(data)
            displayHouse(data)
        }
    })
}

function getOne(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/find/" + id,
        success: function (data) {
            console.log(data)
            findOne(data)
        }
    })
}
function findOne(data) {
    let res = ""
    res+= '<h2>Detail</h2><hr>' +'<h4>Name: ' +data.name + '</h4>'
        + '<h4>Number of Bathroom: ' + data.bathroom +'</h4>' +
        '<h4>Description: '+ data.category.description+'</h4>'
    document.getElementById("div2").innerHTML = res;
}

function displayHouse(data) {

    let res = "<h2>List house</h2>" + "<table border='1px' width='100%'><tr>" + "<th>Name</th>" + "<th>Bathroom</th>" + "<th>Category</th>"
        + "<th style=\"color: rebeccapurple\">Detail</th>"
        + "<th style=\"color: rebeccapurple\">Edit</th>"
        + "<th style=\"color: rebeccapurple\">Delete</th></tr>"
    for (let i = 0; i < data.length; i++) {
        res += "<tr><td>" + data[i].name + "</td>" +
            "<td>" + data[i].bathroom + "</td>" +
            "<td>" + data[i].category.name + "</td>" +

            "<td align=\"center\">" + "<button onclick='getOne(" + data[i].id + ")'>Detail</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='showFormEdit(" + data[i].id + ")'>Edit</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='deleteById(" + data[i].id + ")'>Delete</button>" + "</td></tr>";
    }
    document.getElementById("div1").innerHTML = res;
}

function getAllCategory() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories/",
        success: function (data) {
            console.log(data)
            displayCategory(data)
        }
    })
}

function displayCategory(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += "<br>" + data[i].name
    }
    document.getElementById("div1").innerHTML = str;
}

function deleteById(id) {
    if (confirm("Really want to delete?")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "DELETE",
            url: "http://localhost:8080/api/houses/" + id,
            success: getAllHouse,
            error: function (error) {
                alert("ops!! Something wrong!")
            }
        });
    }
}

function showFormEdit(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/" + id,
        success: function (data) {
            console.log(data)
            let res = '<h2>Edit form</h2><hr>' + '<div class="row"><div class="col-5">' +
                '<h5>Enter name:</h5><h5>Bathroom:</h5><h5>Category:</h5></div>\n' +
                '<div class="col-6"><input type="text" placeholder="name" id="name" value="' + data.name + '">' +
                '<input type="text" placeholder="bathroom" id="bathroom" value="' + data.bathroom + '">' +
                "<select id=\"category\"></div></div>;"
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/categories/",
                success: function (data1) {
                    console.log(data1)
                    for (let i = 0; i < data1.length; i++) {
                        res += `<option value="${data1[i].id}">${data1[i].name}</option>`

                    }
                    res += '</select>' + '<br><button onclick="saveEdit(' + data.id + ')">Save</button>'
                    document.getElementById('div2').innerHTML = res;
                },
                error: function (error) {
                    alert("ops!! Something wrong!")
                }
            })
        }
    })
}

function saveEdit(id) {
    let house = {
        name: document.getElementById("name").value,
        bathroom: document.getElementById("bathroom").value,
        category: {
            id: document.getElementById("category").value,
        }
    }
    console.log(house)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/houses/" + id,
        data: JSON.stringify(house),
        success: getAllHouse,
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}

function showFormAdd() {
    let res = "<h2>Add new house</h2><hr>" + "<table><tr>" + "<th>Name</th>" +
        "<td><input type=\"text\" id=\"name\"></td></tr>"
        + "<tr>" + " <th>Bathroom</th>" + " <td><input type=\"text\" id=\"bathroom\"></td></tr>"
        + "<tr>" + "<th>Category</th>" + "<td>"
        + "<select id=\"category\">" +
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/categories/",
            success: function (data) {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    res += `<option value="${data[i].id}">${data[i].name}</option>`

                }
                res += "</td></tr></select></table>" + '<button onclick="save()">Add</button>'
                document.getElementById('div2').innerHTML = res;
            }
        })
}

function save() {
    let name = $('#name').val()
    let bathroom = document.getElementById("bathroom").value;
    let category = document.getElementById("category").value;
    let house = {
        name: name,
        bathroom: bathroom,

        category: {
            id: category
        }
    }
    console.log(house);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8080/api/houses/",
        data: JSON.stringify(house),
        success: function (data) {
            getAllHouse(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function orderByName() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/find/",
        success: function (data) {
            console.log(data)
            let str = "<h2>Order by name</h2>" + "<table border='1px'  width='100%'><tr>" + "<th>Name</th>" + "<th>Bathroom</th>"
                + "<th>Category</th></tr>"
            for (let i = 0; i < data.length; i++) {
                str += "<tr><td>" + data[i].name + "</td>" +
                    '<td>' + data[i].bathroom + "</td>" +
                    '<td>' + data[i].category.name + "</td>"
            }
            str += "</table>"
            document.getElementById("div1").innerHTML = str;
        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}

function category1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/findCategory1",
        success: function (data) {
            console.log(data)
            let str = "<h2>Biệt thự</h2>" + "<table border='1px'  width='100%'><tr>" + "<th>Name</th>" + "<th>Bathroom</th>"
                + "<th>Category</th></tr>"
            for (let i = 0; i < data.length; i++) {
                str += "<tr><td>" + data[i].name + "</td>" +
                    '<td>' + data[i].bathroom + "</td>" +
                    '<td>' + data[i].category.name + "</td>"
            }
            str += "</table>"
            document.getElementById("div1").innerHTML = str;
        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}

function category2() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/findCategory2",
        success: function (data) {
            console.log(data)
            let str = "<h2>Nhà vườn</h2>" + "<table border='1px'  width='100%'><tr>" + "<th>Name</th>" + "<th>Bathroom</th>"
                + "<th>Category</th></tr>"
            for (let i = 0; i < data.length; i++) {
                str += "<tr><td>" + data[i].name + "</td>" +
                    '<td>' + data[i].bathroom + "</td>" +
                    '<td>' + data[i].category.name + "</td>"
            }
            str += "</tr></table>"
            document.getElementById("div1").innerHTML = str;
        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}

function findBathroom() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/houses/findBathroom/",
        success: function (data) {
            console.log(data)
            let str = "<h2>Order by name</h2>" + "<table border='1px'  width='100%'><tr>" + "<th>Name</th>" + "<th>Bathroom</th>"
                + "<th>Category</th></tr>"
            for (let i = 0; i < data.length; i++) {
                str += "<tr><td>" + data[i].name + "</td>" +
                    '<td>' + data[i].bathroom + "</td>" +
                    '<td>' + data[i].category.name + "</td>" +
                "<td align=\"center\">" + "<button onclick='getOne(" + data[i].id + ")'>Detail</button>" + "</td>"
            }
            str += "</tr></table>"
            document.getElementById("div1").innerHTML = str;
        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}