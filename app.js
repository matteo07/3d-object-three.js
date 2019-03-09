var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.prepend(renderer.domElement);

// ADD LIGHT AND CAMERA
var light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(50, 50, 50);
scene.add(light);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// ADD OBJECT
new THREE.GLTFLoader().load("model.glb", function (gltf) {
	const scale = 2;
	gltf.scene.scale.set(scale, scale, scale);
	scene.add(gltf.scene);
});

// ANIMATE
let start = function () {
	requestAnimationFrame(start);
	renderer.render(scene, camera);
};

let mouseMove = function (e) {
	const rotationSpeed = .21;
	const movementXSpeed = -.005;
	const movementYSpeed = .003;

	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;

	const x = e.clientX;
	const y = e.clientY;

	let characther = scene.children[1]
	characther.rotation.y = toRad((centerX - x) * rotationSpeed);

	camera.position.x = (centerX - x) * movementXSpeed;
	camera.position.y = (centerY - y) * movementYSpeed;
};

// UTILS
function toRad(deg) {
	return (deg % 360) / 180 * Math.PI
};