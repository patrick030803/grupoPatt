var selectedRow = null;

// Función para mostrar alertas
function showAlert(message, className) {
    var div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    var container = document.querySelector(".container");
    var main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Agregar o actualizar datos del estudiante
document.querySelector("#student-form").addEventListener("submit", function(e) {
    e.preventDefault();

    var ApellidoPaterno = document.querySelector("#ApellidoPaterno").value;
    var DNI = document.querySelector("#DNI").value;
    var ApellidoMaterno = document.querySelector("#ApellidoMaterno").value;
    var Direccion = document.querySelector("#Direccion").value;
    var PreNombre = document.querySelector("#PreNombre").value;
    var Distrito = document.querySelector("#Distrito").value;

    // Validación
    if (ApellidoPaterno === "" || DNI === "" || ApellidoMaterno === "" || Direccion === "" || PreNombre === "" || Distrito === "") {
        showAlert("Por favor, debe completar todos los campos", "danger");
    } else {
        var studentList = document.querySelector("#student-list");

        if (selectedRow === null) {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${ApellidoPaterno}</td>
                <td>${ApellidoMaterno}</td>
                <td>${PreNombre}</td>
                <td>${DNI}</td>
                <td>${Direccion}</td>
                <td>${Distrito}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">MODIFICAR</a>
                    <a href="#" class="btn btn-danger btn-sm delete">ELIMINAR</a>
                </td>
            `;
            studentList.appendChild(row);
            showAlert("Estudiante agregado exitosamente", "success");
        } else {
            // Actualizar la fila seleccionada
            selectedRow.children[0].textContent = ApellidoPaterno;
            selectedRow.children[1].textContent = ApellidoMaterno;
            selectedRow.children[2].textContent = PreNombre;
            selectedRow.children[3].textContent = DNI;
            selectedRow.children[4].textContent = Direccion;
            selectedRow.children[5].textContent = Distrito;
            selectedRow = null;
            showAlert("Información del estudiante actualizada", "info");
        }

        // Limpiar el formulario
        document.querySelector("#student-form").reset();
    }
});

// Editar una fila de estudiante
document.querySelector("#student-list").addEventListener("click", function(e) {
    if (e.target.classList.contains("edit")) {
        selectedRow = e.target.parentElement.parentElement;
        document.querySelector("#ApellidoPaterno").value = selectedRow.children[0].textContent;
        document.querySelector("#ApellidoMaterno").value = selectedRow.children[1].textContent;
        document.querySelector("#PreNombre").value = selectedRow.children[2].textContent;
        document.querySelector("#DNI").value = selectedRow.children[3].textContent;
        document.querySelector("#Direccion").value = selectedRow.children[4].textContent;
        document.querySelector("#Distrito").value = selectedRow.children[5].textContent;
    }
});

// Eliminar una fila de estudiante
document.querySelector("#student-list").addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
        showAlert("Registro de estudiante eliminado", "danger");
    }
});
