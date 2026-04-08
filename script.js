
document.addEventListener("DOMContentLoaded", function () {

    var form1 = document.getElementById("form-soumission");
    if (form1) {
        form1.addEventListener("submit", pageSoumission1);
    }

    var form2 = document.getElementById("form-soumission2");
    if (form2) {
        form2.addEventListener("submit", pageSoumission2);
    }

    var form3 = document.getElementById("form-soumission3");
    if (form3) {
        form3.addEventListener("submit", pageSoumission3);

        var oui = document.getElementById("reclamations-oui");
        var non = document.getElementById("reclamations-non");
        var section = document.getElementById("section-reclamations");
        var nbrRecla = document.getElementById("nbrReclamations");
        var rec_montants = document.getElementById("rec_montants");

        function afficherNbrReclamations() {
            if (oui && oui.checked) {
                section.style.display = "block";
            }

            if (non && non.checked) {
                section.style.display = "none";
            }
        }

        if (oui) {
            oui.addEventListener("change", afficherNbrReclamations);
        }

        if (non) {
            non.addEventListener("change", afficherNbrReclamations);
        }

        if (nbrRecla) {
            nbrRecla.addEventListener("input", function () {

                rec_montants.innerHTML = "";

                var nbr = Number(nbrRecla.value);

                for (var i = 1; i <= nbr; i++) {

                    var label = document.createElement("label");
                    label.className = "texte";
                    label.textContent = "Pour la réclamation " + i + ", quel montant avez-vous réclamé ?";
                    rec_montants.appendChild(label);
                    rec_montants.appendChild(document.createElement("br"));

                    var input = document.createElement("input");
                    input.type = "number";
                    input.id = "montant" + i;
                    input.name = "montant" + i;
                    input.className = "champ";
                    input.min = 0;
                    input.step = 1;
                    input.placeholder = "Ex. 5000";

                    rec_montants.appendChild(input);
                    rec_montants.appendChild(document.createElement("br"));
                }
            });
        }
    }

    //Afficher les prix sur la page resultat
    var prix = document.getElementById("prix-annuel");
    if (prix) {
        afficherPrix();
    }
});

//========================= Page soumission.html =========================
function pageSoumission1(event) {
    event.preventDefault();

    var genre = document.getElementById("genre");
    var dateNaissance = document.getElementById("naissance");
    var errGenre = document.getElementById("err-genre");
    var errDateNaissance = document.getElementById("err-naissance");

    let valide = true;

    errGenre.textContent = "";
    errDateNaissance.textContent = "";
    genre.classList.remove("champ-invalide");
    dateNaissance.classList.remove("champ-invalide");

    //Vérification du genre
    if (!genre.value) {
        errGenre.textContent = "Veuillez sélectionner votre genre.";
        genre.classList.add("champ-invalide");
        valide = false;
    }

    //Vérification de la date de naissance
    if (!dateNaissance.value) {
        errDateNaissance.textContent = "Veuillez entrer votre date de naissance.";
        dateNaissance.classList.add("champ-invalide");
        valide = false;
    }

    var anneeValide= new Date(dateNaissance.value);
    var anneeActuelle = new Date();
    if(anneeValide > anneeActuelle){
        errDateNaissance.textContent = "Veuillez entrer une date de naissance valide.";
        dateNaissance.classList.add("champ-invalide");
        valide = false;
    }

    if (valide) {
        var age = calculerAge(dateNaissance.value);

        if (genre.value === "femme" && age < 16) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (genre.value === "homme" && age < 18) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (genre.value === "autre" && age < 18) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (age >= 100) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        localStorage.setItem("genre", genre.value);
        localStorage.setItem("age", age);

        window.location.href = "soumission2.html";
    }
}

//========================= Page soumission2.html =========================
function pageSoumission2(event) {
    event.preventDefault();

    var valeur = document.getElementById("valeur");
    var errValeur = document.getElementById("err-valeur");
    var valeurValue = Number(valeur.value);

    let valide = true;

    errValeur.textContent = "";
    valeur.classList.remove("champ-invalide");

    //Vérification de la valeur
    if (!valeurValue) {
        errValeur.textContent = "Veuillez entrez une valeur pour votre véhicule.";
        valeur.classList.add("champ-invalide");
        valide = false;
    }

    if (valide) {
        if (valeurValue > 100000) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        localStorage.setItem("valeur", valeurValue);

        window.location.href = "soumission3.html";

    }
}

//========================= Page soumission3.html =========================
function pageSoumission3(event) {
    event.preventDefault();

    var annee = document.getElementById("annee");
    var km = document.getElementById("km");
    var camera = document.querySelector("input[name='camera']:checked");
    var reclamations = document.querySelector("input[name='reclamations']:checked");
    var nbrReclamations = document.getElementById("nbrReclamations");

    var errAnnee = document.getElementById("err-annee");
    var errKm = document.getElementById("err-km");
    var errCamera = document.getElementById("err-camera");
    var errReclamations = document.getElementById("err-reclamations");
    var err_nbrReclamations = document.getElementById("err-nbrReclamations");
    var err_rec_montants = document.getElementById("err-rec-montants");

    errAnnee.textContent = "";
    errKm.textContent = "";
    errCamera.textContent = "";
    errReclamations.textContent = "";
    err_nbrReclamations.textContent = "";
    if (err_rec_montants) {
        err_rec_montants.textContent = "";
    }

    annee.classList.remove("champ-invalide");
    km.classList.remove("champ-invalide");

    if (nbrReclamations) {
        nbrReclamations.classList.remove("champ-invalide");
    }

    let valide = true;

    //Vérification de l'année de fabrication
    if (!annee.value) {
        errAnnee.textContent = "Veuillez entrer l'année de fabrication du véhicule.";
        annee.classList.add("champ-invalide");
        valide = false;
    }

    //Vérification du kilomètrage
    if (!km.value) {
        errKm.textContent = "Veuillez entrer le nombre de kilomètres parcourus par année.";
        km.classList.add("champ-invalide");
        valide = false;
    }

    //Vérification caméra de recul
    if (!camera) {
        errCamera.textContent = "Veuillez indiquer si votre véhicule à une caméra de recul.";
        valide = false;
    }

    //Vérification des reclamations
    if (!reclamations) {
        errReclamations.textContent = "Veuillez indiquer si vous avez fait des réclamations.";
        valide = false;
    }

    //Vérification de nombre de réclamations
    if (reclamations && reclamations.value === "oui") {
        if (!nbrReclamations.value) {
            err_nbrReclamations.textContent = "Veuillez indiquer le nombre de réclamations.";

            if (nbrReclamations) {
                nbrReclamations.classList.add("champ-invalide");
            }

            valide = false;
        }
    }

    var montantTotal = 0;
    var nbrRec = 0;

    if (reclamations.value === "oui") {
        nbrRec = Number(nbrReclamations.value);

        for (var i = 1; i <= nbrRec; i++) {
            var mont = document.getElementById("montant" + i);

            if (!mont.value) {
                if (err_rec_montants) {
                    err_rec_montants.textContent = "Veuillez entrer tous les montants de vos réclamations.";
                }

                if (mont) {
                    mont.classList.add("champ-invalide");
                }

                valide = false;
            } else {
                var valeurMont = Number(mont.value);
                montantTotal += valeurMont;
            }
        }
    }

    if (valide) {
        var anneeAuj = new Date().getFullYear();
        var ageVehicule = anneeAuj - Number(annee.value);
        var kmAnnuel = Number(km.value);


        if (ageVehicule > 25) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (kmAnnuel > 50000) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (camera.value === "non") {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (nbrReclamations.value > 4) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        if (montantTotal > 35000) {
            window.location.href = "pas-de-produit.html";
            return;
        }

        localStorage.setItem("km", kmAnnuel);
        localStorage.setItem("nbrReclamations", nbrRec);
        localStorage.setItem("montantTotal", montantTotal);

        calculerPrix();

    }
}

//Calculer l'âge
function calculerAge(dateNaissance) {
    var aujourdhui = new Date();
    var naissance = new Date(dateNaissance);

    var age = aujourdhui.getFullYear() - naissance.getFullYear();
    var mois = aujourdhui.getMonth() - naissance.getMonth();

    if (mois < 0 || (mois === 0 && aujourdhui.getDate() < naissance.getDate())) {
        age--;
    }

    return age;
}

function calculerMontantBase() {
    var genre = localStorage.getItem("genre");
    var age = Number(localStorage.getItem("age"));
    var valeur = Number(localStorage.getItem("valeur"));

    var montantBase = 0;

    if ((genre === "homme" || genre === "autre") && age < 25) {
        montantBase = valeur * 0.05;
    } else if (age >= 75) {
        montantBase = valeur * 0.04;
    } else {
        montantBase = valeur * 0.015;
    }
    return montantBase;
}

function calculerPrix() {
    var montantBase = calculerMontantBase();
    var nbrReclamations = Number(localStorage.getItem("nbrReclamations"));
    var km = Number(localStorage.getItem("km"));
    var montantTotal = Number(localStorage.getItem("montantTotal")) || 0;

    var assuranceAnnuelle = montantBase + (350 * nbrReclamations) + (0.02 * km);

    if (montantTotal > 25000) {
        assuranceAnnuelle = assuranceAnnuelle + 700;
    }

    var prixMensuel = assuranceAnnuelle / 12;

    localStorage.setItem("assuranceAnnuelle", assuranceAnnuelle);
    localStorage.setItem("prixMensuel", prixMensuel);

    window.location.href = "resultat.html";

}

function afficherPrix() {
    var prixAnnuel = localStorage.getItem("assuranceAnnuelle");
    var prixMois = localStorage.getItem("prixMensuel");

    if (prixAnnuel && prixMois) {
        document.getElementById("prix-annuel").textContent = Number(prixAnnuel).toFixed(2) + " $";
        document.getElementById("prix-mensuel").textContent = Number(prixMois).toFixed(2) + " $";
    }
}