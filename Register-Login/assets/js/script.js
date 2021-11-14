import { Storage } from "./storage.js"
import { users } from "./users.js" // Creado para probar nomas. No usado al final

$(window).resize(anchoPag);

// Botones:

$("#btn__registrarse").click(register)
$("#btn__iniciar-sesion").click(login)
$("#btn__registrarse").click(register)
$("#btn__iniciar-sesion").click(login)






// VARIABLES:

const contenedorLogReg = $(".contenedor__login-register")
const cajaBackLogin = $(".caja__back-login")
const cajaBackRegister = $(".caja__back-register")
const formularioLogin = $(".formulario__login")
const formularioRegister = $(".formulario__register")

// Registrarse
const usernameSignup = $("#usernameSignup");
const nameSignup = $("#nameSignup");
const emailSignup = $("#emailSignip");
const passwordSignup = $("#passwordSignup");
const formSignup = $("#sign-up")

//Ingresar
const mailLogin = $("#emailLogin");
const passwordLogin = $("#passwordLogin");
const formLogin = $("#log-in")






function anchoPag() {
    //const resultado = $(".resultado");
    //resultado.hide()
    if ($(window).innerWidth() > 850) {
        cajaBackLogin.show();
        cajaBackRegister.show();
    } else {
        cajaBackRegister.show();
        cajaBackRegister.css("opacity", "1");
        cajaBackLogin.hide();
        formularioLogin.show();
        formularioRegister.hide();
        contenedorLogReg.css("left", "0px")
    }
}

anchoPag()

function register() {
    formSignup[0].reset()
    const resultado = $(".resultado-sign");
    resultado.hide()
    if ($(window).innerWidth() > 850) {
        
        formularioRegister.show();
        contenedorLogReg.css("left", "385px");
        formularioLogin.hide();
        cajaBackRegister.css("opacity", "0");
        cajaBackLogin.css("opacity", "1");
    } else {
        formularioRegister.show();
        contenedorLogReg.css("left", "0px");
        formularioLogin.hide();
        cajaBackRegister.hide();
        cajaBackLogin.show();
        cajaBackLogin.css("opacity", "1");
        
    }
}

function login() {
    formLogin[0].reset()

    const resultado = $(".resultado-log");
    resultado.hide()
    if ($(window).innerWidth() > 850) {
        formularioRegister.hide();
        contenedorLogReg.css("left", "10px");
        formularioLogin.show();
        cajaBackRegister.css("opacity", "1");
        cajaBackLogin.css("opacity", "0");
    } else {
        formularioRegister.hide();
        contenedorLogReg.css("left", "0px");
        formularioLogin.show();
        cajaBackRegister.show();
        cajaBackLogin.hide();
        
    }
}



function crearUser() {
    const boton = $("#btn-signUp");
    const resultado = $(".resultado-sign");
    let users = Storage.getAllUsers()
    boton.on('click', (event) => {
        
        event.preventDefault();
        let error = validarCamposSign();
        if (error[0]) {
            resultado.html(error[1]).fadeIn("slow", function() {
                resultado.html(error[1]).fadeOut(5000)
            })
                resultado.addClass("red")
            //resultado.show()
            } else {
                const user = {
                    id:Math.floor(Math.random()*1000000),
                    nombre:nameSignup.val(),
                    mail:emailSignup.val(),
                    username:usernameSignup.val(),
                    password:passwordSignup.val()
                }
                users.push(user)
                Storage.saveUsers(users)
                resultado.html("Solicitud enviada correctamente");
                resultado.addClass("green")
                resultado.removeClass("red")
                resultado.show()
                formSignup[0].reset()
            }

    });
}
function ingresar() {
    
    const boton = $("#btn-login");
    const resultado = $(".resultado-log");
    
    boton.on('click', (event) => {
        event.preventDefault();
        let error = validarCamposLog();
        
        if (error[0]) {
            resultado.html(error[1]).fadeIn("slow", function() {
                resultado.html(error[1]).fadeOut(5000)
            })
            resultado.addClass("red")
            
            //resultado.show()
            
            } else {
                resultado.html("Solicitud enviada correctamente").fadeIn();
                resultado.addClass("green")
                resultado.removeClass("red")
                resultado.show()
                formLogin[0].reset()
            }

    });
}


const validarCamposSign = ()=>{
    let error = [];

    if (nameSignup.val().length == 0) {
        error[0] = true;
        error[1] = "* El nombre no puede quedar vacío";

    }else if (emailSignup.val().length < 5 || 
        emailSignup.val().length > 40 || 
        emailSignup.val().indexOf("@") == -1 ||
        emailSignup.val().indexOf(".") == -1 ) {
            error[0] = true;
            error[1] = "* El mail es inválido";

    } else if (usernameSignup.val().length < 5) {
        error[0] = true;
        error[1] = "* El nombre de usuario no puede contener menos de 5 caracteres";
        
    } else if (usernameSignup.val().length > 40) {
        error[0] = true;
        error[1] = "* El nombre de usuario no puede contener más de 40 caracteres";
       
    } else if (passwordSignup.val().length < 8) {
        error[0] = true;
        error[1] = "* La clave no puede contener menos de 8 caracteres";
    } else {
        error[0] = false;
    }
    return error
    
}

const validarCamposLog = ()=>{
    let error = [];
    let user = Storage.checkUser(mailLogin.val())

    if (!mailLogin.val()) {
        error[0] = true;
        error[1] = "* El campo 'Correo Electrónico' no debe quedar vacío.";
    } else if (!user) {
        error[0] = true;
        error[1] = "* El mail ingresado no existe";
    } else if (!passwordLogin.val()) {
        error[0] = true;
        error[1] = "* El campo 'Contraseña' no debe quedar vacío.";
    } else if (passwordLogin.val() != user.password) {
        error[0] = true;
        error[1] = "* La contraseña ingresada es incorrecta.";

    } else {
        error[0] = false;
    }
    return error
    
}

function main() {
    formLogin[0].reset()
    formSignup[0].reset()
    Storage.getAllUsers()
    crearUser()
    ingresar()
}

main()








