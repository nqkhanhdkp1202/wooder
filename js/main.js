//Change Color Menu 
function changeColorMenu() {
    const header = document.querySelector('.header') //Lấy phần tử header
    const slide = document.querySelector('.slider') //Lấy phần tử slider
    document.addEventListener('scroll', function () {
        let scrollY = window.pageYOffset //Lấy chiều cao đã scroll trong cửa sổ trình duyệt
        if (scrollY > slide.clientHeight / 2) { //Nếu scroll tới vị trí dưới phân nửa của slider
            header.classList.add('show') // Thêm class show vào header
        }
        else { // Nếu scroll đến vị trí trên nửa slider
            header.classList.remove('show') //Thu hồi class show trong header
        }
    })
}
changeColorMenu(); //Gọi hàm

// Remove class active in menu
function removeActiveMenu() {
    let menus = document.querySelectorAll('.header .header__menu li a') //Lấy các phần tử trong menu
    menus.forEach(menu__element => { //chạy vòng lặp
        menu__element.classList.remove('active'); //Thu hồi class active với tất cả phần tử
    });
}

// Click scroll to menu 
function scrollMenu() {
    let sections = [] //Mảng tạm chứa các section
    let menus = document.querySelectorAll('.header .header__menu li a') //Lấy các phần tử trong menu
    const header = document.querySelector('.header') //Lấy phần tử header
    menus.forEach(element => {//chạy vòng lặp
        let className = element.getAttribute('href').replace('#', ''); //Lấy thuộc tính href có trong thẻ a vd: #slider, #about gán cho biến className
        let section = document.querySelector('.' + className); //Lấy tất cả section có className vừa lấy
        sections.push(section); //Đẩy các section trong vòng lặp vào mảng tạm

        element.addEventListener('click', function (e) { //Nghe sự kiện click vào thẻ a 
            e.preventDefault(); //Ngăn chuyển trang
            window.scrollTo({ //Scroll cửa sổ trình duyệt tới vị trí top = top của section trừ cho chiều cao của header
                top: section.offsetTop - header.offsetHeight
            })
            removeActiveMenu(); //Gọi hàm xóa class active menu 
            this.classList.add('active'); //Thêm class active vào thẻ a vừa click
        })
    });

    window.addEventListener('scroll', function () { //Lằng nghe sự kiện scroll của cửa sổ trình duyệt 
        let scrollY = window.pageYOffset; //Gán chiều cao của cửa sổ trình duyệt cho biến scrollY
        const header = document.querySelector('.header') //Lấy phần tử header
        sections.forEach(function (element, index) { //chạy vòng lặp
            let height = element.offsetTop - header.offsetHeight - 10;  //Lấy chiều cao tối đa của một section trừ header trừ hao 10px
            if (scrollY > height) { //Nếu scroll tới vị trí lớn hơn chiều cao tối đa
                removeActiveMenu(); // Xóa class active
                menus[index].classList.add('active') // Thêm class active vào thẻ a
            }
        })
    })
}
scrollMenu();

//Select language 
function selectLang() {
    const lang = document.querySelector('.header__right-lang')
    let langCurrent = document.querySelector('.current p'),
        langOpt = document.querySelector('.select'),
        langItems = document.querySelectorAll('.select a')
    lang.addEventListener('click', function (e) {
        e.stopPropagation();
        langOpt.classList.toggle('active')
    })

    langItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let textSelect = this.textContent;
            let textTemp = langCurrent.textContent;
            langCurrent.innerHTML = textSelect;
            this.innerHTML = textTemp;
        })
    });

    document.addEventListener('click', function () {
        langOpt.classList.remove('active')
    })
}
selectLang();

//Slide image 
// function handleClickBtn() {
//     const btnprev = document.querySelector('.--prev')
//     const btnnext = document.querySelector('.--next')
//     let slides = document.querySelectorAll('.slider__wrap-item')
//     let index = 1;

//     showSlides(index)
//     btnnext.addEventListener('click', function () {
//         index++;
//         if (index > slides.length) { index = 1 }
//         else if (index < 1) {
//             index = slides.length
//         }
//         showSlides(index);
//         showNumber(index);
//         showDot(index);
//     })
//     btnprev.addEventListener('click', function () {
//         index--;
//         if (index > slides.length) { index = 1 }
//         else if (index < 1) {
//             index = slides.length
//         }
//         showSlides(index);
//         showNumber(index);
//         showDot(index);
//     })
// }

// function showSlides(n) {
//     let slides = document.querySelectorAll('.slider__wrap-item')

//     for (let i = 0; i < slides.length; i++) {
//         slides[i].classList.remove('active')
//     }
//     slides[n - 1].classList.add('active')
// }

// function showNumber(index) {
//     let number = document.querySelector('.slider__bottom-left .number')
//     let numberTemp = index.toString().padStart(2, "0");
//     number.innerHTML = numberTemp;
// }

// function showDot(index) {
//     let dots = document.querySelectorAll('.dot li')
//     dots.forEach(element => {
//         element.classList.remove('active')
//     });
//     dots[index - 1].classList.add('active')
// }

// function clickDot() {
//     let dots = document.querySelectorAll('.dot li')
//     dots.forEach(function (element, index) {
//         element.addEventListener('click', function () {
//             showSlides(index + 1);
//             showNumber(index + 1);
//             showDot(index + 1);
//         })
//     });
// }

// clickDot();

// handleClickBtn();


//Toggle menu 
function toggleMenu() {
    const btnmenu = document.querySelector('.btn-mobile')
    const navigator = document.querySelector('nav')
    btnmenu.addEventListener('click', function () {
        this.classList.toggle('active')
        navigator.classList.toggle('active')
    })

    function hideNav() {
        const btnmenu = document.querySelector('.btn-mobile')
        const navigator = document.querySelector('nav')
        btnmenu.classList.remove('active')
        navigator.classList.remove('active')
    }

    window.addEventListener('resize', function () {

        let wWindow = window.innerWidth;
        if (wWindow > 992) {
            hideNav();
        }
    })
}

toggleMenu();

//Back to top
function btnBackClick() {
    const btnback = document.querySelector('.totop'),
        btntotop = document.querySelector('.btn-back')
    window.addEventListener('scroll', function () {
        let scrollY = window.pageYOffset;
        let height = document.body.offsetHeight;
        let heightFooter = document.querySelector('.footer').offsetHeight;
        if (scrollY > height / 4 && scrollY < (height - heightFooter - window.innerHeight)) {
            btnback.classList.add('active')
        }
        else {
            btnback.classList.remove('active')
        }
    })
    btnback.addEventListener('click', function () {
        window.scrollTo({
            'top': 0
        })
    })
    btntotop.addEventListener('click', function () {
        window.scrollTo({
            'top': 0
        })
    })
}
btnBackClick();

//Progess bar 
function loadProgress() {
    let bar = document.querySelector('.progress-bar')
    window.addEventListener('scroll', function () {
        let scrollY = window.pageYOffset;
        let pageHeight = document.body.clientHeight;
        let viewHeight = window.innerHeight;
        let percent = (scrollY / (pageHeight - viewHeight)) * 100;
        bar.style.width = `${percent}%`;
    })
}
document.addEventListener('load', loadProgress())

//Videos list 
function handleClickPlay() {
    let modal = document.querySelector('.popupvideo')
    let close = document.querySelector('.btnclose')
    let playbtn = document.querySelectorAll('.circle')
    playbtn.forEach((element, index) => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            modal.classList.add('active')
            playVideo(index);
        })
    });
    close.addEventListener('click', function () {
        modal.classList.remove('active')
        closeVideo();
    })

    document.addEventListener('click', function (e) {
        modal.classList.remove('active')
        closeVideo();
    })
}

function playVideo(index) {
    let videos = ['YBBEGKzGpvM', '58IkVCh3hWU', 'L0NZW6pgSLc'];
    const url = 'https://www.youtube.com/embed/';
    const player = document.querySelector('.popupvideo__inner-iframe iframe')
    player.setAttribute('src', `${url}${videos[index]}?autoplay=1`)
}

function closeVideo() {
    const player = document.querySelector('.popupvideo__inner-iframe iframe')
    player.setAttribute('src', ``)
}

handleClickPlay();

function handleSliderHero() {
    var slider = document.querySelector('.slider__wrap');
    var flktySlider = new Flickity(
        slider,
        {
            cellAlign: 'left',
            wrapAround: true,
            draggable: '>1',
            prevNextButtons: false,
            contain: true,
            on: {
                ready: function () {
                },
                change: function (index) {
                    handlePaging(index)
                }
            }

        }

    );
    const prev = document.querySelector('.--prev')
    const next = document.querySelector('.--next')
    prev.addEventListener('click', function () {
        flktySlider.previous(true)
    })
    next.addEventListener('click', function () {
        flktySlider.next(true)
    })
    function handleDotSlider() {
        const dots = document.querySelector('.flickity-page-dots')
        const dotBottom = document.querySelector('.slider__bottom-left .dot')
        dotBottom.appendChild(dots)
    }
    handleDotSlider();

    function handlePaging(index) {
        let number = document.querySelector('.slider__bottom-left .number')
        number.innerHTML = (index + 1).toString().padStart(2, '0')
    }

    // function handleScroll(){
    //     flkty.on('scroll', function (progress) {
    //         progress = Math.max(0, Math.min(1, progress));
    //         console.log(progress);
    //     });
    // }
    // handleScroll();
}

handleSliderHero();

function handleSliderScroll() {
    var scroll = document.querySelector('.scscroll__list');
    var progressbar = document.querySelector('.progress-scroll')
    var flktySlider = new Flickity(scroll, {
        // options
        prevNextButtons: false,
        cellAlign: 'left',
        contain: true

    });
    // flktySlider.on('scroll', function (progress) {
    //     progressbar.style.width = progress * 100 + '%'
    // });

}

handleSliderScroll();

function handleTabs() {
    const btnTabs = document.querySelectorAll('.scnews__filter-btn')
    const listNews = document.querySelectorAll('.scnews__list')
    btnTabs.forEach(element => {
        element.addEventListener('click', function () {

            btnTabs.forEach(element => {
                element.classList.remove('active')
            })
            this.classList.add('active');

            listNews.forEach(element => {
                element.classList.remove('active')
            })
            let id = 1;
            id = this.getAttribute('data-tab');
            let temp = document.querySelector(`.scnews__list-${id}`)
            temp.classList.add('active')
        })
    });
}

handleTabs();

function handleMenuMobile() {
    let menus = document.querySelectorAll('.nav .nav__list li a')
    const header = document.querySelector('.header') //Lấy phần tử header
    const nav = document.querySelector('nav')
    const btn = document.querySelector('.btn-mobile')
    menus.forEach(element => {//chạy vòng lặp
        let className = element.getAttribute('href').replace('#', ''); //Lấy thuộc tính href có trong thẻ a vd: #slider, #about gán cho biến className
        let section = document.querySelector('.' + className) //Lấy tất cả section có className vừa lấy
        element.addEventListener('click', function (e) { //Nghe sự kiện click vào thẻ a 
            e.preventDefault(); //Ngăn chuyển trang
            window.scrollTo({ //Scroll cửa sổ trình duyệt tới vị trí top = top của section trừ cho chiều cao của header
                top: section.offsetTop - header.offsetHeight
            })
            nav.classList.remove('active')
            btn.classList.remove('active')
        })
    })
}

handleMenuMobile();

function handleFAQ() {
    const accordions = document.querySelectorAll('.scfaq__question')
    accordions.forEach(element => {
        element.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('active');
        })
    })
}

handleFAQ();