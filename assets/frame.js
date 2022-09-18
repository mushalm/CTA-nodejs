let defaultFontSize = 16;
const placeholder = document.querySelector('.placeholder');
const text = document.querySelector('#text');


text.addEventListener('blur', function () {
    if (text.value == "" || text.value == null) {
        placeholder.style.animation = 'TEXTin 0.8s steps(20, end) both';
    }
})

text.addEventListener('focus', function () {
    placeholder.style.animation = 'TEXT 0.8s steps(20, end) both';
})

function isActive(butt) {
    return document.querySelector('.' + butt).classList.toggle('active');
}

function color(colorId) {
    text.style.color = colorId;
}

const SmallFont = function () {
    defaultFontSize -= 2;
    text.style.fontSize = defaultFontSize + 'px';
}


const Biggerfont = function () {
    defaultFontSize += 2;
    text.style.fontSize = defaultFontSize + 'px';
}

const BoldFont = function bold(bold) {
    if (isActive("bold")) {
        text.style.fontWeight = "bold";
    } else {
        text.style.fontWeight = "normal";
    }
}

const ItalicFont = function italic(italic) {
    if (isActive("italic")) {
        text.style.fontStyle = "italic";
    } else {
        text.style.fontStyle = "normal";
    }
}

const TextLeft = function textLeft(textleft) {
    if (isActive("left")) {
        pTextAlign = text.style.textAlign;
        text.style.textAlign = "left";
        if (document.querySelector(".center").classList.contains("active")) {
            isActive("center");
        }
        if (document.querySelector(".right").classList.contains("active")) {
            isActive("right");
        }
    } else {
        text.style.textAlign = pTextAlign;
    }
}

const TextCenter = function center(center) {
    if (isActive("center")) {
        pTextAlign = text.style.textAlign;
        text.style.textAlign = "center";
        if (document.querySelector(".left").classList.contains("active")) {
            isActive("left");
        }
        if (document.querySelector(".right").classList.contains("active")) {
            isActive("right");
        }
    } else {
        text.style.textAlign = pTextAlign;
    }
}

const TextRight = function textRight(textRight) {
    if (isActive("right")) {
        pTextAlign = text.style.textAlign;
        text.style.textAlign = "right";
        if (document.querySelector(".left").classList.contains("active")) {
            isActive("left");
        }
        if (document.querySelector(".center").classList.contains("active")) {
            isActive("center");
        }
    }
    else { text.style.textAlign = pTextAlign };
}

const MoDe = document.querySelector('.mode i');
const Tools = document.querySelectorAll('button , input ,  label');
const Container = document.querySelector('.container');
let i;

const Mode = function mode(mode) {
    if (isActive("mode")) {
        document.body.style.background = "#f5f5f5";
        text.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        text.style.color = '#1f1f1f';
        text.style.border = '1px solid rgba(0, 0, 0, 0.6)';
        placeholder.style.color = '#1f1f1f';
        MoDe.setAttribute("class", "fas fa-moon");
        MoDe.classList.add("ModeAnimations");
        Container.classList.add('container-sun');
        for (i = 0; i < Tools.length; i++) {
            Tools[i].style.color = '#1f1f1f';
            Tools[i].style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        }
    } else {
        document.body.style.background = "#1f1f1f";
        text.style.boxShadow = '0 0 28px rgba(0, 0, 0, 0.5)';
        text.style.color = '#f5f5f5';
        text.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        placeholder.style.color = '#f5f5f5';
        MoDe.setAttribute("class", "fas fa-sun");
        MoDe.classList.remove("ModeAnimations");
        Container.classList.remove('container-sun');
        for (i = 0; i < Tools.length; i++) {
            Tools[i].style.color = '#f5f5f5';
            Tools[i].style.boxShadow = '0 0 28px rgba(0, 0, 0, 0.5)';
        }
    }
}