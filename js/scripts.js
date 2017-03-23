/*
1. Link do mapy z położeniem użytkownika
Wykorzystaj API Geolokalizacji, by stworzyć odnośnik do map Bing, który otworzy mapę z aktualnym położeniem użytkownika. Stwórz na stronie internetowej przycisk, po kliknięciu którego pobrane zostanie położenie odwiedzającego. Z uzyskanych danych wyłuskaj latitude i longitude, a następnie wstaw je odpowiednio w następujący URL: 
http://bing.com/maps/default.aspx?cp=LAT~LON uzyskując w ten sposób np.
http://bing.com/maps/default.aspx?cp=52.162050~21.071350 
Na koniec, wyświetl użytkownikowi link, po kliknięciu którego zostanie przeniesiony pod wcześniej skonstruowany adres.
*/

(function() {

    var positionOutput = document.querySelector("#position"),
        linkOutput = document.querySelector("#link"),
        button = document.querySelector("#button");



    if (!navigator.geolocation) { 
        positionOutput.innerHTML = "Ta przeglądarka nie wspiera Geolokalizacji!";
    } 


    function geoSuccess(position) {

        /*   PYTANIE: czy dopisanie sp=point.latitude_longitude_titleString
        (wg strony wg https://msdn.microsoft.com/en-us/library/dn217138.aspx )
        jak w poniższej zakomentowanej linii nie powinno pokazywać jakiegoś markera - zamiast tego powoduje pojawienie się komunikatu o Udostępnionych miejscach z tekstem "Wystąpił problem z zapisaniem zmian w kolekcji. Spróbuj ponownie."    */

        // var url = "http://bing.com/maps/default.aspx?cp=" + position.coords.latitude + "~" + position.coords.longitude + "&lvl=17&style=h&sp=point." + position.coords.latitude + "-" + position.coords.longitude + "_Jestes%20tutaj";


        var url = "http://bing.com/maps/default.aspx?cp=" + position.coords.latitude + "~" + position.coords.longitude + "&lvl=17&style=h&rtp=pos." + position.coords.latitude + "_" + position.coords.longitude + "_Jestes%20tutaj";


        positionOutput.innerHTML = "Twoja pozycja to: " + position.coords.latitude + ", " + position.coords.longitude;
        linkOutput.innerHTML = "<a href='" + url + "' target='_blank'>Link do mapy Bing</a>";

    }



    function geoError(errorObj) {

        var errorMessage;

        switch (errorObj.code) {
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

    var options = { 
        timeout: 1000
    }

   button.onclick = function() {

        positionOutput.innerHTML = "Czekaj...";

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
    }

})();
