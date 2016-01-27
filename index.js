require('bootstrap');
//THREE = require('three');
THREE = require('./js/three.js');


// jQuery for page scrolling feature - requires jQuery Easing plugin
$('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
});

// Fit Text Plugin for Main Header
$("h1").fitText(
    1.2, {
        minFontSize: '35px',
        maxFontSize: '65px'
    }
);

// Initialize WOW.js Scrolling Animations
new WOW().init();

/* Init three stuff */
var camera, scene, renderer;
var geometry, material, mesh;
var lastRenderTime = Date.now();
var theta = 0;
var radius = 600;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    scene = new THREE.Scene();

    geometry = new THREE.IcosahedronGeometry(400.0, 1);
    material = new THREE.MeshBasicMaterial({
        color: 0xf0f0f0, 
        opacity: 0
    });

    mesh = new THREE.Mesh(geometry, material);
    var wireframe = new THREE.EdgesHelper( mesh, 0x3D72A4 );
    
    mesh.position.x = 0.0;
    mesh.position.y = 0.0;
    mesh.position.z = 0.0;

    
    scene.add(mesh);
    scene.add(wireframe);
    
    var bigCircle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
    bigCircle.setAttribute( 'fill', '#3D72A4' );
    bigCircle.setAttribute( 'r', '5' );
    
    for ( var i = 0; i < mesh.geometry.vertices.length; i ++ ) {
         var vertex = new THREE.SVGObject(bigCircle.cloneNode());
         vertex.position.x = mesh.geometry.vertices[i].x;
         vertex.position.y = mesh.geometry.vertices[i].y;
         vertex.position.z = mesh.geometry.vertices[i].z;
         vertex.transparent = true;
         scene.add(vertex);
    }
    
    renderer = new THREE.SVGRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('three').appendChild(renderer.domElement);

}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    // Time delta in seconds
    var timeDelta = (Date.now() - lastRenderTime) / 1000.0;
    lastRenderTime = Date.now();

    // Rotate Camera
    theta += (6.0 * timeDelta);

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));

    var focus = scene.position.clone();
    focus.x += 150.0;
    focus.y += -80.0;
    camera.lookAt( focus );

    camera.updateMatrixWorld();

    // Render
    renderer.render(scene, camera);
}


