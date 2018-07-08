//Load Data in Table when documents is ready  
$(document).ready(function () {
    loadData();
});

//Load Data function  
function loadData() {
    $.ajax({
        url: "/Usuario/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Nombre + '</td>';
                html += '<td>' + item.Apellido + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Id: $('#Id').val(),
        Nombre: $('#Nombre').val(),
        Apellido: $('#Apellido').val(),
        Usuario: $('#Usuario').val(),
        Contrasena: $('#Contrasena').val()
    };
    $.ajax({
        url: "/Usuario/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID  
function getbyID(UsuarioId) {
    $('#Nombre').css('border - color', 'lightgrey');
    $('#Apellido').css('border-color', 'lightgrey');
    $('#Usuario').css('border-color', 'lightgrey');
    $('#Contrasena').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Usuario/GetById/" + UsuarioId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Nombre').val(result.Nombre);
            $('#Apellido').val(result.Apellido);
            $('#Usuario').val(result.Usuario);
            $('#Contrasena').val(result.Contrasena);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var usuarioObj = {
        Id: $('#Id').val(),
        Nombre: $('#Nombre').val(),
        Apellido: $('#Apellido').val(),
        Usuario: $('#Usuario').val(),
        Contrasena: $('#Contrasena').val(),
    };
    $.ajax({
        url: "/Usuario/Update",
        data: JSON.stringify(usuarioObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Nombre').val("");
            $('#Apellido').val("");
            $('#Usuario').val("");
            $('#Contrasena').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record  
function Delele(codigo) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Usuario/Delete/" + codigo,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes  
function clearTextBox() {
    $('#Id').val("");
    $('#Nombre').val("");
    $('#Apellido').val("");
    $('#Usuario').val("");
    $('#Contrasena').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nombre').css('border-color', 'lightgrey');
    $('#Apellido').css('border-color', 'lightgrey');
    $('#Usuario').css('border-color', 'lightgrey');
    $('#Contrasena').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#Nombre').val().trim() == "") {
        $('#Nombre').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nombre').css('border-color', 'lightgrey');
    }
    if ($('#Apellido').val().trim() == "") {
        $('#Apellido').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Apellido').css('border-color', 'lightgrey');
    }
    if ($('#Usuario').val().trim() == "") {
        $('#Usuario').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Usuario').css('border-color', 'lightgrey');
    }
    if ($('#Contrasena').val().trim() == "") {
        $('#Contrasena').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Contrasena').css('border-color', 'lightgrey');
    }
    return isValid;
}  
