function getNameCanvas() {

    var myName = "Fiona Lin";

    var red = [0, 100, 63];
    var orange = [40, 100, 60];
    var green = [75, 100, 40];
    var blue = [196, 77, 55];
    var purple = [280, 50, 60];
    var letterColors = [purple, orange, green, red];
    console.log(window)

    drawName(myName, letterColors);

    if (10 < 3) {
        bubbleShape = 'square';
    } else {
        bubbleShape = 'circle';
    }
    bounceBubbles();
}

function getNav() {
    let navObjects = [{
        title: "Home",
        href: 'index.html'
    }, {
        title: "My study",
        href: 'study.html'
    }, {
        title: "LinkedIn Resume",
        href: 'http://au.linkedin.com/in/FionaCLin'
    }, {
        title: "Projects",
        href: 'projects.html'
    }]
    const [curHref] = window.location.pathname.split('/').slice(-1)


    let navContent = navObjects.map(({href, title}, index) => `<li>
				<a class="nav-link ${curHref === href ? 'active' : ''}" href="${href}">${title}</a>
			</li>`).join('')
    $('nav>ul').html(navContent)
    $('nav .nav-open-btn').on('click', function () {
        $('nav .nav-display').toggleClass('open');
    })


}

function getFooter() {
    let footers = [{
        img: 'image/twitter.png',
        href: 'https://twitter.com/FionaCLin',
        title: 'Twitter'
    }, {
        img: 'image/github_alt.png',
        href: 'https://github.com/FionaCLin',
        title: 'GitHub'
    }, {
        img: 'image/linkedin.png',
        href: 'http://au.linkedin.com/in/FionaCLin',
        title: 'LinkedIn'
    }]
    let footerContent = `<ul class="social-links">
        ${footers.map(({img, href, title}) => `<li>
            <a alt="${title}" target="_blank" href="${href}">
                <img src="${img}" alt="Twitter" title="${title}">
            </a>
        </li>`)}
		</ul>
		<span class="site-info">Copyright @ Fiona Lin 2021</span>`
    $('footer').html(footerContent)
}

$(document).ready(function () {

    console.log("document loaded");

    $('#quote').html('<div>Choose your love, Love your choice.</div><div>- Thomas S. Monson</div>')
    getNav();
    getFooter();
    console.log('ready',canvas)
    getNameCanvas()

});

$(window).on("load", function () {
    console.log("canvas loaded", canvas);
});

