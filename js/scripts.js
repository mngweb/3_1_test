
(function() {

    var supportOutput = document.querySelector("#supportOutput"),
        positionOutput = document.querySelector("#positionOutput"),
        findPositionButton = document.querySelector("#findPosition");


//SPRAWDZANIE WSPARCIA PRZEGLĄDARKI DLA GEOLOKALIZACJI
    if (!navigator.geolocation) { // jeśli w obiekcie navigator znajduje się obiekt geolocation to mamy wsparcie
        supportOutput.innerHTML = "Twoja przeglądarka nie wspiera Geolokalizacji!";
        supportOutput.classList.add("alert-danger");
    } else {
        supportOutput.innerHTML = "Twoja przeglądarka wspiera Geolokalizację!";
        supportOutput.classList.add("alert-success");
    }

//FUNKCJA SUKCESU
    function geoSuccess(position) { // funkcja wykonywana, gdy uda się pobrać pozycję
        positionOutput.innerHTML = "Twoja pozycja to: " + position.coords.latitude + "," + position.coords.longitude; // latitude - szerokość, longitude - długość geograficzna
        // polecam wyświetlenie position w konsoli poprzez console.log(position) i przyjrzenie się pozostałym właściwościom
    }


//FUNKCJA OBSŁUGI BŁĘDÓW
    function geoError(errorObj) { // funkcja wykonywana, gdy wystąpił jakiś bląd

        var errorMessage;

        switch (errorObj.code) { // .code to kod błedu, możemy go porównać do:
            case errorObj.PERMISSION_DENIED:
                errorMessage = "Brak pozwolenia na znalezienie lokalizacji.";
                break;

            case errorObj.POSITION_UNAVAILABLE:
                errorMessage = "Brak dostępu do sieci.";
                break;

            case errorObj.TIMEOUT:
                errorMessage = "Przekroczono czas oczekiwania.";
                break;
        }

        positionOutput.innerHTML = "<strong>Wystąpił błąd: </strong>" + errorMessage;

    }

    var options = { // opcje przekazywane przy pobieraniu pozycji
        timeout: 5000 // można podać jeszcze enagleHighAccuracy: true/false oraz maximumAge: jako liczba (domyślnie Infinity)
    }

    findPositionButton.onclick = function() { // po wciśnięciu przycisku

        positionOutput.innerHTML = "Czekaj..."; //bo pobieranie lokalizacji zazwyczaj chwilę trwa

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options); // pobieramy pozycję i przekazujemy funkcje oraz opcje do .getCurrentPosition
        

// navigator.geolocation.getCurrentPosition(function(pos){
// 	console.log(pos.coords.latitude);
// });

    }

})();