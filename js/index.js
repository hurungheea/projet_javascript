"use strict";

window.onload = function()
{
    if(scion === undefined)
    {
        swal({
            title:"Error de chargement !!",
            type:'error',
            text:'Un problème est survenue lors du téléchargement de la page, veuillez la recharger pour tenter de corrier l\'erreur',
            footer:'<a onclick="document.location.reload(true);">Recharger la page</a>'
        });
    }
    
    
};