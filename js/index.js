import { stateModel } from "./stateModel.js";
import { Port } from "./port.js";

function getStateModelStatus(interpreter)
{
    console.log(interpreter);
}

window.onload = function()
{
    if(scion === undefined)
    {
        swal({
            title:"Erreur de chargement !!",
            type:'error',
            text:'Un problème est survenu lors du téléchargement de la page, veuillez la recharger pour tenter de corriger l\'erreur',
            footer:'<a style="cursor:pointer;" onclick="document.location.reload(true);">Recharger la page</a>'
        });
    }
    let interpreter = new scion.Statechart(stateModel);
    let port = new Port();

    let myConsole = document.querySelector("#myConsole");
    let buttonGo =  document.querySelector("#go");
    let buttonStart =  document.querySelector("#start");

    buttonStart.addEventListener('click',
        ()=>
        {
            interpreter.start();
            myConsole.innerHTML = getStateModelStatus(interpreter) + "<br>";
        }
        ,false);

    buttonGo.addEventListener('click',
        ()=>
        {
            myConsole.innerHTML += getStateModelStatus(interpreter) + "<br>";
        }
        ,false);   
};