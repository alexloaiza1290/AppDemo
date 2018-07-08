var PersonaModule = function (config) {
    var _config = {
        urlListarPersona: config.urlListarPersona,
        urlRegistrar: config.urlRegistrar,
        urlActualizar: config.urlActualizar,
        urlEliminar: config.urlEliminar
    };
    var _obtenerPersonas = function () {
        $.ajax({
            type: "GET",
            url: _config.urlListarPersona,
            success: function (data) {
                if (data.success) {
                    _setPersonas(data.personas);
                }
                else {
                    alertify.alert("Mensaje", "No existen personas." );
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertify.alert("Mensaje", thrownError);
            }
        });
        return false;
    };
    var _setPersonas = function (personas) {
        var table = $('#table_personas').DataTable({
            destroy: true,
            columns: [
                { data: 'Id' },
                { data: 'Nombre' },
                { data: 'Apellido' },
                {
                    data: null,
                    className: "center",
                    defaultContent: '<button id="btn-editar-persona" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-editar" data-remote="false"> <span class="glyphicon glyphicon-pencil"></span></button> ' +
                        '<button id="btn-eliminar-persona" class="btn btn-default btn-sm" data-toggle="modal" data-target="#modal-eliminar" data-remote="false"> <span class="glyphicon glyphicon-remove"></span></button> '
                }
            ],
            order: [[0, "desc"]],
            data: personas,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            }
        });

        //$('#table_personas tbody').on('click', '#btn-editar-persona', function () {
        //    var cliente = table.row($(this).parents('tr')).data();
        //    _obtenerPersona(cliente.NumeroDocumentoIdentidad);
        //});

        //$('#table_personas tbody').on('click', '#btn-eliminar-persona', function () {
        //    var cliente = table.row($(this).parents('tr')).data();
        //    $("#txt-num-doc-eliminar").val(persona.NumeroDocumentoIdentidad);
        //});
    };
    var _registrar = function () {
        var _id = $("#txt-id").val();
        var _nombre = $("#txt-nombre").val();
        var _apellido = $("#txt-apellido").val();
        var _usuario = $("#txt-usuario").val();
        var _clave = $("#txt-clave").val();

        $.ajax({
            type: "POST",
            url: _config.urlRegistrar,
            data: {
                Id: _id,
                Nombre: _nombres,
                Apellido: _apellido,
                Usuario: _usuario,
                Clave: _clave
                
            },
            success: function (data) {
                if (data.success) {
                    alertify.alert("Registro de persona", data.mensaje, function () {
                        _limpiar();
                        window.location.reload();
                    });
                }
                else
                    alertify.alert("Mensaje", data.mensaje);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertify.alert("Mensaje", thrownError);
            }
        });

        return false;
    };

    var _editar = function () {
        var _id = $("#txt-id").val();
        var _nombre = $("#txt-nombre").val();
        var _apellido = $("#txt-apellido").val();
        var _usuario = $("#txt-usuario").val();
        var _clave = $("#txt-clave").val();
        $.ajax({
            type: "POST",
            url: _config.urlActualizar,
            data: {
                Id: _id,
                Nombre: _nombres,
                Apellido: _apellido,
                Usuario: _usuario,
                Clave: _clave

            },
            success: function (data) {
                if (data.success) {
                    alertify.alert("Actualizacion de persona", data.mensaje, function () {
                        _limpiar();
                        window.location.reload();
                    });
                }
                else
                    alertify.alert("Mensaje", data.mensaje);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertify.alert("Mensaje", thrownError);
            }
        });

        return false;
    };

    var _eliminar = function (numeroDocumento) {
        var _id = $("#txt-id-eliminar").val();
        $.ajax({
            type: "POST",
            url: _config.urlEliminar,
            data: { id: _id },
            success: function (data) {
                if (data.success) {
                    alertify.alert("Eliminación de persona", data.mensaje, function () {
                        _limpiar();
                        window.location.reload();
                    });
                }
                else
                    alertify.alert("Mensaje", data.mensaje);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alertify.alert("Mensaje", thrownError);
            }
        });

        return false;
    };
    var _limpiar = function () {
        _removerTabla();
    };

    var _removerTabla = function () {
        var table = $('#table_personas').DataTable();

        var rows = table
            .rows()
            .remove()
            .draw();
    };
    var _initialize = function () {
        _obtenerPersonas();
    };

    return {
        initialize: _initialize
    };
};