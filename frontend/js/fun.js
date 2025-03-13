//init-----------------------------------------------------------------------------------------------------------
function createContentSections(parentId){
    const parent = document.getElementById(parentId);
    for (let i = 0;i < Sections.length;i++){
        const section = document.createElement('section');
        section.id = Sections[i] + '-content';
        section.className = 'content';
        parent.appendChild(section);
    }
}

function initClasses(parentId, className) {
    const parent = document.getElementById(parentId);
    const elements = parent.querySelectorAll('section');
    for (let i = 0; i < elements.length; i++) if (elements[i].parentNode === parent) elements[i].classList.add(className);
}

function includeHTML(page) {
    const container = document.getElementById(page + '-content');
    fetch(`/templates/${page}.html`)
      .then(response => response.text())
      .then(data => { container.innerHTML = data; })
      .catch(error => console.error("Error loading page:", error));
}


//navbar-----------------------------------------------------------------------------------------------------------
function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
}

function display(pressed){
    const id = pressed.id;


    scrollToTop();
    let navButtons = document.getElementsByClassName('nav-element');
    for (let i = 0; i < navButtons.length; i++) navButtons[i].classList.remove('selected');
    pressed.classList.add('selected');

    if (id == "register" || id == "login") document.querySelector('footer').style.display = 'none';
    else document.querySelector('footer').style.display = 'block';

    const elements = document.getElementsByClassName('content');
    for (let i = 0; i < elements.length; i++) elements[i].style.display = 'none';
    if (id == "home") for (let i = 0; i < homeSections.length; i++) document.getElementById(homeSections[i] + '-content').style.display = 'flex';
    else document.getElementById(id + '-content').style.display = 'flex';
}

function displayWithCheck(pressed){
    if (pressed.classList.contains('login-blocked'))alert('loginolj te fa hogy tudj ilyet!');
    else display(pressed);
}

function toggleLoginBlocked(){
    for (let i = 0; i < loginBlocked.length; i++) loginBlocked[i].classList.toggle('login-blocked');    
}

//team-----------------------------------------------------------------------------------------------------------
function toggleFlip(element) {
  element.classList.toggle('flipped');
}
//rate-----------------------------------------------------------------------------------------------------------
function displayStars(value){   
    const halfStar  = "../images/half-star.png";
    const emptyStar = "../images/empty-star.png";
    const fullStar  = "../images/star.png";
    const imgName = 'rate-star-image'
    let stars = document.getElementsByClassName(imgName);

    for (let i = 0; i < stars.length; i++)stars[i].src = emptyStar
    
    const before = Math.floor(value/2);
    const isEven = value % 2 === 0;

    for(let i = 0;i < before; i++) document.getElementById(imgName + (i + 1)).src = fullStar;
    if (!isEven) document.getElementById(imgName + (before + 1)).src = halfStar;
    window.star = value;
}

//calendar-----------------------------------------------------------------------------------------------------------
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function setClickedIntoUserInput(element){
    document.getElementById('date-input').innerText = element.getAttribute('name');
}

function setBlankDayNode(date){
    const calendar = document.getElementById(`calendar-${date.getFullYear()}-${date.getMonth()+1}`);
    calendar.innerHTML += `<div class="day" id="empty-day"></div>`;
}

function setDayNode(date){
    const calendar = document.getElementById(`calendar-${date.getFullYear()}-${date.getMonth()+1}`);
    const HTML = `
    <div 
        class="day" 
        onclick="setClickedIntoUserInput(this)" 
        name="${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}">        
        ${date.getDate()}
    </div>`;
    calendar.innerHTML += HTML;
}

function setCalendarContainer(date, parent){
    const calendar = document.createElement('div');
    calendar.id = `calendar-${date.getFullYear()}-${date.getMonth() + 1}`;
    calendar.classList.add('calendar');
    parent.appendChild(calendar);
    
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    if (firstDay === 0) for(let i = 0; i < 6;i++) setBlankDayNode(date);
    else for(let i = 0;i < (firstDay - 1);i++) setBlankDayNode(date);
    
}

function setCalendarDays(date){
    const lenOfMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    for(let i = 1; i <= lenOfMonth ;i++) setDayNode(new Date(date.getFullYear(), date.getMonth(), i));
}

function setCalendarVisible(){
    let calendars = document.getElementsByClassName('calendar');
    calendars[0].style.display = 'flex';
    for (let i = 1; i < calendars.length; i++) calendars[i].style.display = 'none';
    headerUpdater(calendars[0].id);
}

function headerUpdater(id){    
    const currentMonthElement = document.getElementById("current-month");
    const formattedDate = `${id.split('-')[1]} ${months[id.split('-')[2] - 1]}`;
    currentMonthElement.innerText = formattedDate;
}

function setCalendarVisibleViaButton(isRight){
    let calendars = document.getElementsByClassName('calendar');
    let currentId;
    for(let i = 0; i < calendars.length; i++) if (calendars[i].style.display !== 'none') currentId = i;


    if (isRight){
        if (currentId + 1 == calendars.length) return;
        else{
            calendars[currentId].style.display = 'none';
            calendars[currentId + 1].style.display = 'flex';
            headerUpdater(calendars[currentId + 1].id);
        }
    }else{
        if (currentId == 0) return;
        else{
            calendars[currentId].style.display = 'none';
            calendars[currentId - 1].style.display = 'flex';
            headerUpdater(calendars[currentId - 1].id);

        }
    }


}

//randomizer
class Randomizer{
    constructor(output){
        //values for hours and minutes
        this.hora = 3600;
        this.minutos = 60;
        this.min = 0;
        this.max = 86399;
        this.output = document.getElementById(output);
        this.randomize();
    }    
    randomize(){
        this.raw = Math.round(Math.random() * (this.max - this.min)) + this.min;
        const hours = Math.floor(this.raw / this.hora);
        const remains = this.raw % this.hora;
        const minutes = Math.floor(remains/this.minutos);
        const seconds = remains % this.minutos;
        this.date = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.output.innerText = this.date;
    }
    set(isHigh){
        isHigh ? this.max = this.raw : this.min = this.raw;
        this.randomize()
    }
    reset(outputId){
        //values for hours and minutes
        this.hora = 3600;
        this.minutos = 60;
        this.min = 0;
        this.max = 86399;
        this.output = document.getElementById(outputId)
        this.randomize();
    }
}

//menu-----------------------------------------------------------------------------------------------------------
function CreateFoodList(){
    let foodsList = [];
    for(let i = 0;i < foods.length;i++) 
        foodsList.push(`
            <div class="dish" id="kaja${i}" onclick="insertFood(this);scrollToTopInstant();togglePopupType(true);stopSadEmojis();togglePopup('', false, true)">
                <img src="../images/kaja${i}.jpg" alt="">
                <h3>${foods[i][0]}</h3>
                <p class='food-price'>${foods[i][2]}</p>
                <p class='food-desc'>${foods[i][1]}</p>
            </div>
        `);
    return foodsList;
}

function togglePopupType(isFood){
    const foodBox = document.getElementById('food-box');
    const confirmBox = document.getElementById('confirm');
    if (isFood){
        foodBox.style.display = 'flex';
        confirmBox.style.display = 'none';
        return;
    }
    confirmBox.style.display = 'flex';
    foodBox.style.display = 'none';
}

function insertFood(parent){
    let children = parent.children;
    document.getElementById('food-box-image').src = children[0].src;
    texts = [
        document.getElementById('food-box-title'),
        document.getElementById('food-box-desc'),
        document.getElementById('food-box-price'),
    ];
    for (let i = 0; i < texts.length; i++) texts[i].innerText = children[i+1].innerText;  
}

function addElementsToMenu(){
    const menu = document.getElementById('menu-notnavbar');
    foodsList = CreateFoodList();

    for (let i = 0; i < foodsList.length; i++) {
        const element = createElementFromHTML(foodsList[i]);
        menu.appendChild(element);
    }
}

//util-----------------------------------------------------------------------------------------------------------
function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}

function scrollToTopInstant() {
    window.scrollTo({ top: 0,
        left: 0,
        behavior: "instant"
    });
}

function togglePopup(message, isBad, isFood){
    document.getElementById('result-message').innerHTML = message;
    document.getElementById('popup').classList.toggle('popup-invisible');
    window.popup = !(window.popup);
    if (window.popup) {
        document.body.style.overflow = 'hidden';
        if (isFood) return;
        if (isBad) triggerSadEmojis();
        else triggerConfetti();
        
    }
    else document.body.style.overflow = 'auto';
}


function createElementFromHTML(htmlString) {
    let template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

//fetching
function signOut(){
    sessionStorage.clear();
    display(document.getElementById('home'))
    scrollToTop();
    setLoggedInButtons(false)
    document.getElementById('admin-pajdzs').style.display = "none";
}

function POSTdata(id){
    switch(id){
        case 'login':
            return JSON.stringify({
                "username": document.getElementById('login-username').value,
                "password": document.getElementById('login-password').value,
            });
        case 'register':
            return JSON.stringify({
                "username": document.getElementById('register-username').value,
                "email": document.getElementById('register-email').value,
                "password": document.getElementById('register-password').value,
            });
        case 'reservation':
            const dateRaw = String(document.getElementById('date-input').innerText);
            const timeOfDay = String(document.getElementById('rando-output').innerText);
            date = dateRaw.split('-');
            for (let i = 1; i < date.length; i++) date[i] =  date[i].padStart(2, '0');
            joinedDate = date.join(':');
            time = joinedDate + ":" + timeOfDay;

            return JSON.stringify({
                "userId": Number(sessionStorage.getItem('id')),
                "reserved": time,
            });            
        case 'review':
            return JSON.stringify({
                "userId": Number(sessionStorage.getItem('id')),
                "rating": window.star,
                "review": document.getElementById('review').value,
  
            });   
        default:
            return JSON.stringify({
                "error": "method not found"
            });         
    }
}

function setLoggedInButtons(loggedIn){
    let out = [
        createElementFromHTML(`<a href="#" class="nav-element auth" onclick="display(this)" id="login">Bejelentkezés</a>`),
        createElementFromHTML(`<a href="#" class="nav-element auth" onclick="display(this)" id="register">Regisztráció</a>`),
    ];
    let notOut = [
        createElementFromHTML(`<a href="#" class="nav-element auth" onclick="display(this)" id="my-profile">Profilom</a>`),
        createElementFromHTML(`<a href="#" class="nav-element auth" onclick="signOut();togglePopup('sikeresen kijelentkezél!', false);toggleLoginBlocked()" id="signout">kijelentkezés</a>`),
    ];

    let authButtons = document.querySelectorAll('.auth');

    authButtons[0].replaceWith(loggedIn? notOut[0] : out[0]);
    authButtons[1].replaceWith(loggedIn? notOut[1] : out[1]);
}

function handleResponse(data, type){
    //sessionStorage.clear();
    if (type === 'register' || type === 'login'){
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('email', data.email);
            setLoggedInButtons(true);
            if (type === 'register')  {
                togglePopup('Sikeres regisztráció!', false);
                document.getElementById('register-username').value = '';
                document.getElementById('register-email').value = '';
                document.getElementById('register-password').value = '';
            }
            else if (type === 'login') {
                togglePopup('Sikeres bejelentkezés!', false);
                document.getElementById('login-username').value = '';
                document.getElementById('login-password').value = '';
            }
        toggleLoginBlocked();
        checkIfAdmin(data.id);
        myProfileInit();
    }

    togglePopupType(false);

    if(type === "reservation") togglePopup('Sikeres foglalás!', false);
    if(type === "review") togglePopup('Sikeres visszajelzés!', false);
    
    scrollToTopInstant();
}

function addFetching(element, id){
    element.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: POSTdata(id)
            });
            
            const data = await response.json();

            if (data.error){
                togglePopup(data.error, true);
                togglePopupType(false);
                throw new Error(data.error)
            }else{
                handleResponse(data, id);
            }

            display(document.getElementById('home'));

        } catch (error){
            console.error("Error logging in:", error.message);
        }
    });
}

function checkForRegisterSyntax(){
    const username = document.getElementById('register-username');
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password');

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    const registerButton = document.getElementById('register-button');

    if (regex.test(password.value) && (password.value.length > 8) && (username.value !== '') && (email.value !== '')) registerButton.disabled = false;
    else registerButton.disabled = true;
    
}

function checkForLoginSyntax(){
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');

    if (username.value !== '' && password.value !== '') loginButton.disabled = false;
    else loginButton.disabled = true;
    
}

// Confetti trigger function
function triggerConfetti() {
    stopSadEmojis();
    confetti({
        particleCount: 200,  // Number of confetti pieces
        spread: 70,          // Angle of spread
        origin: { x: 0.5, y: 0.5 }, // Start from the center
        colors: ['#ff79c6', '#ff3366', '#f0f', '#ff6f91'], // Confetti colors
        scalar: 1.2 // Adjust the size of confetti particles
    });
}

function triggerSadEmojis() {
    const canvas = document.getElementById('emojiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojiArray = ['😢', '😭', '☹️', '😞', '😿', '🥺'];
    const emojis = [];

    for (let i = 0; i < 100; i++) {
        emojis.push({
            emoji: emojiArray[Math.floor(Math.random() * emojiArray.length)],
            x: Math.random() * canvas.width,
            y: -20,
            speed: Math.random() * 2 + 2,
            size: 30 + Math.random() * 20
        });
    }

    function animateEmojis() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        emojis.forEach(emoji => {
            ctx.font = `${emoji.size}px sans-serif`;
            ctx.fillText(emoji.emoji, emoji.x, emoji.y);

            emoji.y += emoji.speed;
            if (emoji.y > canvas.height) {
                emoji.y = -20;
                emoji.x = Math.random() * canvas.width;
            }
        });

        window.animationFrameId = requestAnimationFrame(animateEmojis);
    }

    if (!window.animationFrameId) {
        animateEmojis();
    }
}

function stopSadEmojis() {
    if (window.animationFrameId) {
        cancelAnimationFrame(window.animationFrameId);
        window.animationFrameId = null;

        // Clear the canvas
        const canvas = document.getElementById('emojiCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function insertIntoGallery(){
    const gallery = document.getElementById('gallery');
    const randomNumber = Math.floor(Math.random() * 7);
    for (let i = 0; i < 5; i++) {
        gallery.appendChild(createElementFromHTML(`
            <div class="dish" onclick="display(document.getElementById('menu'));scrollToTopInstant()">
                <img src="../images/kaja${randomNumber + i}.jpg">
                <h3>${getDishName(randomNumber + i)}</h3>
            </div>
        `));        
    }
}

function getDishName(id){
    return (document.getElementById(`kaja${id}`).children)[1].innerText;
}

function blockIfNotLoggedIn(){
    let loginOnly = document.querySelectorAll('.login-blocked');

    if (loginOnly.length !== 0)
        for (let i = 0; i < loginOnly.length; i++)
            loginOnly[i].addEventListener('click', (e)=>{e.preventDefault()});
}


function checkIfAdmin(userId){
    if (userId == 2)     document.getElementById('admin-pajdzs').style.display = "flex";
    else document.getElementById('admin-pajdzs').style.display = "none";
}


function displayStarsForQuotes(value){
    
    let stars = "";
    const before = Math.floor(value/2);
    const isOdd = value % 2 === 1;
    for (let i = 0; i < before; i++) stars += `
    <img class="star" src="../images/star.png" alt="">
    `;
    stars += isOdd? `
    <img class="star" src="../images/half-star.png" alt="">
    `:"";
    for (let i = 0; i < (5 - before) - (isOdd?1:0); i++) stars += `
    <img class="star" src="../images/empty-star.png" alt="">
    `;
    return stars;
}

//for reviews
function findUserById(userId){
    userList = dataList[0];
    for (let i = 0; i < userList.length; i++) if(userList[i].id === userId) return i;
    return 0;
}

function myProfileInit(){
    const userId = sessionStorage.getItem("id");
    let users = dataList[0];
    let reservations = dataList[2];
    if (userId){
        let user = null;
        for (let i = 0; i < users.length; i++) if(users[i].id == userId) user = users[i];

        const userElementName = document.getElementById("profile-username");
        const userElementEmail = document.getElementById("profile-email");
        if (userElementEmail == null || userElementName == null) return;
        userElementName.innerText = user.username;
        userElementEmail.innerText = user.email;

        const list = document.getElementById("reservation-list");
        
        let usersReservations = [];
        
        for (let i = 0; i < reservations.length; i++) if(reservations[i].user_id == userId) usersReservations.push(reservations[i]);
        
        if (usersReservations.length > 0) for(let i = 0; i < usersReservations.length; i++) list.innerHTML += `
        <div class="reservation-item" id="reservation-item${i+1}">
        ${timeFormatting(usersReservations[i].reserved)}
        <button onclick="deleteThis(${usersReservations[i].id}, 'reservation')" class="delete-reservation">cancel</button></div>        
        `;
        else list.innerHTML = "you do not have any reservations...";
                 
    }
}

function timeFormatting(time){
    /*const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/
    if (!(regex.test(time))) return "invalid time";*/
    return time.split("+")[0].replace("-", ":").replace("-", ":").replace("T", ":");
}


async function deleteThis(deletedId, typeOf) {
    try {
        const response = await fetch(`http://localhost:8081/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: typeOf,
                id: deletedId,
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json().catch(() => null);
        if (data?.error) throw new Error(data.error);

        sessionStorage.setItem("loadPlease", (typeOf + "s"));
        window.location.reload();

    } catch (error) {
        console.error("Error deleting item:", error.message);
    }
}
