document.addEventListener("DOMContentLoaded", function() {


    if(sessionStorage.getItem("id")){
        setLoggedInButtons(true);
        togglePopupType(false);
        toggleLoginBlocked();
        checkIfAdmin(sessionStorage.getItem("id"));
    }

    window.counter = 0;
    window.popup = true;
    window.animationFrameId = null;

    //creating sections
    createContentSections("main");
    //adding classes
    initClasses("main", "content");
    
    // loading in content
    for (let i = 0; i < Sections.length;i++) includeHTML(Sections[i]);
    display(document.getElementById("home"));
    includeHTML("police");
    includeHTML("footer");

    //loading in the calendar
    const checkForCalendarContainer = setInterval(function() {
    const calendar = document.getElementById('calendar-container');
    if (calendar) {
        clearInterval(checkForCalendarContainer);
        let date = new Date();
        date.setMonth(date.getMonth());
        setCalendarContainer(date, calendar);
        setCalendarDays(date);
        for (let i = 0; i < 5; i++) {
            date.setMonth(date.getMonth() + 1);
            setCalendarContainer(date, calendar);
            setCalendarDays(date);
        }
    }
    }, 100);
    
    //setting created calendars visible
    const checkForAllCalendars = setInterval(function(){
        let calendars = document.getElementsByClassName('calendar');
        if (calendars.length > 4){
          clearInterval(checkForAllCalendars);
          setCalendarVisible();
        }
      }, 100);


    //mounting randomizer with class
    const checkForRandoLoadedIn = setInterval(function(){
        const randoOutput = document.getElementById('rando-output');
        if (randoOutput) {
            window.r = new Randomizer('rando-output');
            clearInterval(checkForRandoLoadedIn);
        }
    }, 100);

    //default rate value
    const starInitValue = setInterval(() => {
        const rateForm = document.getElementById('review-form');
        if (rateForm){
            clearInterval(starInitValue);
            displayStars(10);
        }
    }, 100);

    const checkForForms = setInterval(() => {

        let forms = [
            document.getElementById('login-form'),
            document.getElementById('register-form'),
            document.getElementById('reservation-form'),
            document.getElementById('review-form'),
        ];
    
        const allNotNull = forms.every(form => form !== null && form !== undefined);
    
        if (allNotNull){
            clearInterval(checkForForms);
            for (let i = 0; i < forms.length; i++) addFetching(forms[i], forms[i].id.replace('-form', ''));
        }
    
    
    }, 100);
    //adding menu items
    const addMenuItems = setInterval(() => {
        const menu = document.getElementById('menu-notnavbar');
        if (menu){
            clearInterval(addMenuItems);
            addElementsToMenu();
        }
    }, 100);    

    togglePopup();
    const setGallery = setInterval(() => {
       if (document.getElementById('gallery') && document.getElementById('menu-notnavbar')){
        clearInterval(setGallery);
        insertIntoGallery();
       }
    }, 100);



    window.dataList = [];
const fetchPromises = [];

for (let i = 0; i < 3; i++) {
    fetchPromises.push(
        fetch(`http://localhost:8081/getall/${ids[i]}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.dataList[i] = data; // Store fetched data at the correct index
            })
            .catch(error => console.error('Error fetching data:', error))
    );
}

// Ensure all fetches complete before proceeding
Promise.all(fetchPromises).then(() => {
    window.quotesList = window.dataList[1]; // Now safe to assign
    window.userList = window.dataList[0]; // Now safe to assign

    const checkForQuotes = setInterval(() => {
        const quotesParent = document.getElementById('kvotak');
        if (quotesParent && window.quotesList) {
            clearInterval(checkForQuotes);

            let quotes = [];
            for (let i = 0; quotes.length < 6 && i < window.quotesList.length; i++) {
                if (window.quotesList[i].rating < 8) continue;

                const stars = displayStarsForQuotes(window.quotesList[i].rating);
                const HTML = `
                <blockquote>
                ${stars}
                <br>
                “${window.quotesList[i].review}” - ${userList[findUserById(window.quotesList[i].user_id)].username} 
                </blockquote>
                `;
                quotes.push(HTML);
            }
            quotesParent.innerHTML = quotes.join("");
        }
    }, 100);
});

    

const checkForDataListLoaded = setInterval(() => {
    if (dataList && sessionStorage.getItem("id") && document.getElementById("profile-username") && document.getElementById("profile-email")){
        clearInterval(checkForDataListLoaded);
        myProfileInit();
    }
}, 100);

});


