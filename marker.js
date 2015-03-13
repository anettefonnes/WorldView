/**
 * Created by Anette on 13.03.2015.
 */
function Marker(lo, la, ra) {
    var rad = Math.PI / 180;

    var point = new THREE.Mesh(
        new THREE.CylinderGeometry(2,0,10),
        new THREE.MeshBasicMaterial({color: 0xff0000}));
    point.position.set(ra,0,0);
    point.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0), new THREE.Vector3(1,0,0));

    var mark = new THREE.Object3D;
    mark.add(point);

    mark.quaternion.setFromEuler(
        new THREE.Euler(0, lo * rad, la * rad, "YZX"));

    return mark;
}