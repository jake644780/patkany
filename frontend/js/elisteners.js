
// Show the button when the user scrolls down 100px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) document.getElementById('scrollToTopBtn').style.display = "flex";
    else document.getElementById('scrollToTopBtn').style.display = "none";
};
    
      
    
    
window.addEventListener('keydown', (e) =>{
    
    if (e.key === secretCombination[window.counter]) {
        window.counter++;
        if (window.counter == secretCombination.length) window.open('/陰莖', '_blank');
    }
    else window.counter = 0;
});



document.addEventListener('keydown', ()=>{
    checkForRegisterSyntax();
    checkForLoginSyntax();
});



//prevent editing things
// document.addEventListener("keydown", (event) => {if (event.key === "F12" || (event.ctrlKey && (event.key === "i" || event.key === "I" || event.key === "j" || event.key === "J")))event.preventDefault();});
// document.addEventListener("contextmenu", (event) => event.preventDefault());