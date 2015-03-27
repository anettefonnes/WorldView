/**
 * Created by Anette on 11.03.2015.
 */
var scene, camera, renderer, keyCode, camPosX, camPosZ, camPosY;
var root, earth, stars, light;
var width, height, rad, seg;
var marker;
var locked = true, lockRot = true;

init();
animate();

function init() {
    width = window.innerWidth - 20;
    height = window.innerHeight - 20;

    scene = new THREE.Scene;

    camPosZ = 600;
    camPosY = 100;
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = camPosZ;
    camera.position.y = 300;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.clear();

    rad = 200;
    seg = 300;
    earth = createEarth(rad, seg);
    root = new THREE.Object3D;
    scene.add(root);
    scene.add(earth);
    root.add(earth);

    light = createLight();
    light.position.set(100,0,400);
    light.lookAt(root.position);
    scene.add(new THREE.AmbientLight(0xffffff));
    scene.add(light);

    stars = createStars(rad, seg);
    scene.add(stars);

    marker = placeMarker(60.002345, 45.283746);
    scene.add(marker);
    earth.add(marker);

    //Glow-effect on the marker
    var spriteMat = new THREE.SpriteMaterial(
        {
            map: THREE.ImageUtils.loadTexture('img/glow.png'), align: THREE.Sprite.center,
            color: 0xff0000, transparent: false, blending: THREE.AdditiveBlending
        }
    );
    var sprite = new THREE.Sprite(spriteMat);
    var sprite2 = new THREE.Sprite(spriteMat);
    sprite.scale.set(25,25,1.0);
    sprite2.scale.set(25,25,0.5);
    marker.add(sprite);
    sprite.position.set(203,0,0);
    sprite2.position.set(203,0,0);

    navigator.geolocation.watchPosition(function(pos){
        var lon = pos.coords.longitude, lat = pos.coords.latitude;
        var markerHere = placeMarker(lon, lat);
        scene.add(markerHere);
        earth.add(markerHere);
        markerHere.add(sprite2);
    });

    document.body.appendChild(renderer.domElement);
}
/*
//Strek mellom to punkter
var createCurvePath = function(fromLong, fromLat, toLong, toLat, elevation) {
    var start3 = earth.translateCordsToPoint(start.latitude,start.longitude);
    var end3 = globe.translateCordsToPoint(end.latitude, end.longitude);
    var mid = (new LatLon(start.latitude,start.longitude)).midpointTo(new LatLon(end.latitude, end.longitude));
    var middle3 = globe.translateCordsToPoint(mid.lat(), mid.lon(), elevation);

    var curveQuad = new THREE.QuadraticBezierCurve3(start3, middle3, end3);
    //   var curveCubic = new THREE.CubicBezierCurve3(start3, start3_control, end3_control, end3);

    var cp = new THREE.CurvePath();
    cp.add(curveQuad);
    //   cp.add(curveCubic);
    return cp;
} */

function createLight() {
    return new THREE.DirectionalLight(0xffffff, 0.3);
}

function createEarth(rad, seg) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad, seg, seg),
        new THREE.MeshPhongMaterial({
            map:            THREE.ImageUtils.loadTexture('img/earth.jpg'),
            bumpMap:        THREE.ImageUtils.loadTexture('img/earth_bump.jpg'),
            bumpScale:      2,
            specularMap:    THREE.ImageUtils.loadTexture('img/water_spec.png'),
            specular:       new THREE.Color('grey')
        })
    );
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

function placeMarker(lo, la) {
    var rad = Math.PI / 180;

    var point = new THREE.Mesh(
        new THREE.SphereGeometry(3,10,10),
        new THREE.MeshBasicMaterial({color: 0xff0000}));
    point.position.set(202,0,0);

    /*
    var point = new THREE.Mesh(
        new THREE.CylinderGeometry(2,0,10),
        new THREE.MeshBasicMaterial({color: 0xff0000}));
    point.position.set(203,0,0); */
    point.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0), new THREE.Vector3(1,0,0));

    var mark = new THREE.Object3D;
    mark.add(point);

    mark.quaternion.setFromEuler(
        new THREE.Euler(0, lo * rad, la * rad, "YZX"));

    return mark;
}

function keyPressed(event) {
    keyCode = event.which;

    if(keyCode == 38 && camPosZ > 150 ) {
        camPosZ -= 5;
    }
    if(keyCode == 40) {
        camPosZ += 5;
    }
    if(keyCode == 37) {
        camPosY -= 5;
    }
    if(keyCode == 39) {
        camPosY += 5;
    }
    camera.position.z = camPosZ;
    //camera.position.y = camPosY;
    //camera.position.x = camposX;

    //'l', Lock/Unlock the camera pointing at the root
    if(keyCode == 76){
        locked = !locked;
    }

    //'r', stops/starts rotating earth
    if(keyCode == 82){
        lockRot = !lockRot;
    }
}

function animate() {

    requestAnimationFrame(animate);

    if(locked){
        camera.lookAt(root.position);
    }

    if(lockRot){
        root.rotation.y += 0.005;
    }

    document.addEventListener("keydown", keyPressed, true);
    renderer.render(scene, camera);

}

