"use strict";

import { stateModel } from "./stateModel.js";
import { Port } from "./port.js";

window.onload = function()
{
    if(scion === undefined)
    {
        swal({
            title:"Erreur de chargement !!",
            type:'error',
            text:'Un problème est survenue lors du téléchargement de la page, veuillez la recharger pour tenter de corrier l\'erreur',
            footer:'<a style="cursor:pointer;" onclick="document.location.reload(true);">Recharger la page</a>'
        });
    }
    let interpreter = new scion.Statechart(stateModel);
    let port = new Port();

    $('.start').click(function()
    { 
        interpreter.start();
        
    });
};