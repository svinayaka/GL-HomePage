
var scrolledBottom = false;
var scrollbarElm = document.querySelector(".GL_Main");
var fixedFooterElm = document.querySelector(".GL_Footer");
scrollbarElm.addEventListener('scroll', scrolling);

var intervalStore = null;
invokeInterval();

window.addEventListener("load", retriveUserInfoStorage);



function scrolling(event) {
    const box = document.querySelector('#GL_Main_Form');
    const rect = box.getBoundingClientRect();
    if (rect.bottom <= 0 && !scrolledBottom) {
        scrolledDownShowApply();
    } else if (rect.bottom >= 0 && scrolledBottom) {
        scrolledDownHideApply();
    }
}
function scrolledDownShowApply() {
    scrolledBottom = true;
    scrollbarElm.classList.add('GL_Main--Active');
    fixedFooterElm.classList.add('GL_Footer--Active');
}
function scrolledDownHideApply() {
    scrolledBottom = false;
    scrollbarElm.classList.remove('GL_Main--Active');
    fixedFooterElm.classList.remove('GL_Footer--Active');
}

function openTabContent(tabNo) {
    var tabs = document.querySelectorAll(".GL_Cirriculam__Accordion_Tab_Content");
    var tabsStatusList = document.querySelectorAll(".GL_Cirriculam_Accordion_Tab_Icon");
    changeSlidePage(tabs, tabNo, "GL_Cirriculam__Accordion_Tab_Content--Active");
    tabStatusCheck(tabsStatusList, tabNo);
}

function tabStatusCheck(tabsStatus, tabNo) {
    tabsStatus.forEach((eachTab, id) => {
        if (id+1 == tabNo) eachTab.innerHTML = "-";
        else eachTab.innerHTML = "+";
    });
}

function currentSlide(slideNo) {
    var slidePages = document.querySelectorAll(".GL_Testimonials_Slide");
    var slideDots = document.querySelectorAll(".GL_Testimonials_Slide_Dot");
    changeSlidePage(slidePages, slideNo, "GL_Testimonials_Slide--Active");
    changeSlidePage(slideDots, slideNo, "GL_Testimonials_Slide_Dot--Active");
}
function changeSlidePage(slides, slideNo, activeClassName) {
    slides.forEach((eachSlide, id) => {
        if (id+1 == slideNo) {
            eachSlide.classList.add(activeClassName);
        } else {
            eachSlide.classList.remove(activeClassName);
        }
    });
}

function nextSlide() {
    clearInterval(intervalStore);
    var parentElmLen = document.querySelector("#GL_Testimonials_Slides_Shows").children.length;
    var slidesElmActive = document.querySelector(".GL_Testimonials_Slide--Active").dataset.val;
    var slidesElmList = document.querySelectorAll(".GL_Testimonials_Slide");
    var dotsElmActive = document.querySelector(".GL_Testimonials_Slide_Dot--Active").dataset.val;
    var dotsElmList = document.querySelectorAll(".GL_Testimonials_Slide_Dot");
    if (slidesElmActive < parentElmLen) {
        changeSlidePage(slidesElmList, parseInt(slidesElmActive) + 1, "GL_Testimonials_Slide--Active");
        changeSlidePage(dotsElmList, parseInt(dotsElmActive) + 1, "GL_Testimonials_Slide_Dot--Active");
    } else if (slidesElmActive == parentElmLen) {
        changeSlidePage(slidesElmList, 1, "GL_Testimonials_Slide--Active");
        changeSlidePage(dotsElmList, 1, "GL_Testimonials_Slide_Dot--Active");
    } 
    invokeInterval()
}

function previousSlide() {
    clearInterval(intervalStore);
    var parentElmLen = document.querySelector("#GL_Testimonials_Slides_Shows").children.length;
    var slidesElmActive = document.querySelector(".GL_Testimonials_Slide--Active").dataset.val;
    var slidesElmList = document.querySelectorAll(".GL_Testimonials_Slide");
    var dotsElmActive = document.querySelector(".GL_Testimonials_Slide_Dot--Active").dataset.val;
    var dotsElmList = document.querySelectorAll(".GL_Testimonials_Slide_Dot");
    if (slidesElmActive == 1) {
        changeSlidePage(slidesElmList, parentElmLen, "GL_Testimonials_Slide--Active");
        changeSlidePage(dotsElmList, parentElmLen, "GL_Testimonials_Slide_Dot--Active");
    } else if (slidesElmActive <= parentElmLen) {
        changeSlidePage(slidesElmList, parseInt(slidesElmActive) - 1, "GL_Testimonials_Slide--Active");
        changeSlidePage(dotsElmList, parseInt(dotsElmActive) - 1, "GL_Testimonials_Slide_Dot--Active");
    } 
    invokeInterval()
}

function userFormInfo() {
    localStorage.setItem('name',document.forms["GL_Apply_Form"]["name"].value);
    localStorage.setItem('email',document.forms["GL_Apply_Form"]["email"].value);
    localStorage.setItem('mobile',document.forms["GL_Apply_Form"]["mobile"].value);
    localStorage.setItem('work',document.forms["GL_Apply_Form"]["work"].value);
    localStorage.setItem('org',document.forms["GL_Apply_Form"]["organization"].value);
}

function submitForm(event) {
    userFormInfo();
    var userName = document.forms["GL_Apply_Form"]["name"].value;
    var email = document.forms["GL_Apply_Form"]["email"].value;
    var mobile = document.forms["GL_Apply_Form"]["mobile"].value;
    var work = document.forms["GL_Apply_Form"]["work"].value;
    var organization = document.forms["GL_Apply_Form"]["organization"].value;
    alert("Hurry! You have submitter form!");
}

function retriveUserInfoStorage() {
    document.forms["GL_Apply_Form"]["name"].value = localStorage.getItem('name');
    document.forms["GL_Apply_Form"]["email"].value = localStorage.getItem('email');
    document.forms["GL_Apply_Form"]["mobile"].value = localStorage.getItem('mobile');
    document.forms["GL_Apply_Form"]["work"].value = localStorage.getItem('work');
    document.forms["GL_Apply_Form"]["organization"].value = localStorage.getItem('org');
}

function invokeInterval() {
    intervalStore = setInterval(() => {
        nextSlide();
    }, 6000);
}
