/**
 * Created by Anette on 13.03.2015.
 */
//TODO: Make this function work!
Marker = function(ra) {
    this.rads = Math.PI / 180;

    this.point = new THREE.Mesh(
        new THREE.CylinderGeometry(2,0,10),
        new THREE.MeshBasicMaterial({color: 0xff0000}));
    this.point.position.set(ra,0,0);
    this.point.quaternion.setFromUnitVectors(
        new THREE.Vector3(0,1,0), new THREE.Vector3(1,0,0));

    this.add(this.point);
}

Marker.prototype = THREE.Object3D;
Marker.prototype.setPos = function(lo, la){
    return this.mark.quaternion.setFromEuler(
        new THREE.Euler(0, lo * this.rads, la * this.rads, "YZX"));
};