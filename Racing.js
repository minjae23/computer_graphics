// 씬 생성
const scene = new THREE.Scene();

// 카메라 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 5);  // 약간 높게 설정하여 트랙을 바라보는 시점

// 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// 바닥(트랙) 만들기
const trackGeometry = new THREE.PlaneGeometry(50, 50);
const trackMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
track.rotation.x = -Math.PI / 2;  // 트랙을 수평으로 설정
scene.add(track);

// 차 생성 (박스로 간단히)
const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const carMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const car = new THREE.Mesh(carGeometry, carMaterial);
car.position.y = 0.25;  // 바닥에서 약간 위에 위치
scene.add(car);

// 차량 움직임 제어 변수
let forward = false, backward = false, left = false, right = false;

// 키 입력 처리
document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') forward = true;
  if (event.code === 'ArrowDown') backward = true;
  if (event.code === 'ArrowLeft') left = true;
  if (event.code === 'ArrowRight') right = true;
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowUp') forward = false;
  if (event.code === 'ArrowDown') backward = false;
  if (event.code === 'ArrowLeft') left = false;
  if (event.code === 'ArrowRight') right = false;
});

// 차량 이동 및 회전 속도
// const speed = 0.1;
// const turnSpeed = 0.03;

let baseSpeed = 0.1;  // 기본 이동 속도
let speed = baseSpeed;  // 현재 이동 속도
let baseTurnSpeed = 0.03;  // 기본 회전 속도
let turnSpeed = baseTurnSpeed;  // 현재 회전 속도

// 트랙 경계 추가
const boundaryGeometry = new THREE.BoxGeometry(1, 1, 50);
const boundaryMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });

// 왼쪽 경계
const leftBoundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
leftBoundary.position.set(-25, 0.5, 0);
scene.add(leftBoundary);

// 오른쪽 경계
const rightBoundary = new THREE.Mesh(boundaryGeometry, boundaryMaterial);
rightBoundary.position.set(25, 0.5, 0);
scene.add(rightBoundary);

// 애니메이션 및 렌더링
function animate() {
    requestAnimationFrame(animate);
  
    // 차량 이동
    if (forward) {
      // 앞으로 이동
      car.position.x -= Math.sin(car.rotation.y) * speed;
      car.position.z -= Math.cos(car.rotation.y) * speed;
    }
  
    if (backward) {
      // 뒤로 이동 (forward와 반대로 계산)
      car.position.x += Math.sin(car.rotation.y) * speed;
      car.position.z += Math.cos(car.rotation.y) * speed;
    }
  
    if (left) {
      // 왼쪽으로 회전
      car.rotation.y += turnSpeed;
    }
  
    if (right) {
      // 오른쪽으로 회전
      car.rotation.y -= turnSpeed;
    }
  
    // 카메라 추적
    const cameraOffset = 5;  // 카메라가 차량 뒤로 떨어지는 거리
    const cameraHeight = 3;  // 카메라 높이
  
    // 차량의 회전에 따라 카메라 위치 계산
    camera.position.x = car.position.x - Math.sin(car.rotation.y) * cameraOffset;
    camera.position.z = car.position.z - Math.cos(car.rotation.y) * cameraOffset;
    camera.position.y = car.position.y + cameraHeight;
  
    // 카메라가 차량을 바라보도록 설정
    camera.lookAt(car.position);
  
    renderer.render(scene, camera);
  }
  
  
animate();

// 창 크기 조절 시 카메라와 렌더러 업데이트
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
