import { stateModel } from "./stateModel.js";
import { Port } from "./port.js";

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

    let consoleArea = $('.myConsole');
    consoleArea.attr('readOnly','true');
    console.log(consoleArea);

    $('.start').click(function()
    { 
        interpreter.start();      
    });
};