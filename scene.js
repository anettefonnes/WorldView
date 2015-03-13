/**
 * Created by Anette on 13.03.2015.
 */

/**
 * Created by Anette on 11.03.2015.
 */
var scene, camera, renderer, camPosZ;
var root, stars, light;
var width, height, rad, seg;
//var locked = true, lockRot = true;
var Earth, Marker;

init();
animate();

function init() {

    rad = 200;
    seg = 300;

    scene = setScene();
    Earth = new Earth(rad, seg);
    root = new THREE.Object3D;
    scene.add(root);
    scene.add(Earth);
    root.add(Earth);

    width = window.innerWidth - 20;
    height = window.innerHeight - 20;

    camPosZ = 600;
    camera = setCamera(width, height);
    camera.position.z = camPosZ;
    camera.position.y = 300;

    Marker = new Marker(60.0000, 40.0000, rad+5);
    scene.add(Marker);
    earth.add(Marker);

    renderer = setRenderer();
    renderer.setSize(width, height);

    light = createLight();
    scene.add(new THREE.AmbientLight(0xffffff));
    scene.add(light);

    stars = createStars(rad, seg);
    scene.add(stars);

    document.body.appendChild(renderer.domElement);
}

function setRenderer() {
    return new THREE.WebGLRenderer();
}

function setScene(){
    return new THREE.Scene();
}

function setCamera(w, h){
    return new THREE.PerspectiveCamera(45, w/h, 1, 10000);
}

function createLight() {
    var l = new THREE.DirectionalLight(0xffffff, 0.3);
    l.position.set(400,0,500);
    l.lookAt(root.position);
    return l;
}

function createStars(rad, seg) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad+500, seg, seg),
        new THREE.MeshBasicMaterial({
            map:    THREE.ImageUtils.loadTexture('img/stars.png'),
            side:   THREE.BackSide
        })
    );
}

function animate() {

    requestAnimationFrame(animate);

    camera.lookAt(root.position);

    root.rotation.y += 0.005;

    //document.addEventListener("keydown", keyPressed, true);
    renderer.render(scene, camera);
}

