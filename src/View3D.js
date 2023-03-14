import * as THREE from 'three';
import { WebGLRenderer, PerspectiveCamera, AxesHelper, Scene, RGBFormat, LinearMipmapLinearFilter, sRGBEncoding } from 'three';
import { PCFSoftShadowMap, WebGLCubeRenderTarget, CubeCamera, MathUtils, NoToneMapping } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class View3D {
    constructor(element){
        this.domElement = element;

        this.scene = undefined;
        this.perspectivecamera = undefined;
        this.renderer = undefined;

        this.fov = 60;
        this.cameraNear = 10;
        this.cameraFar = 100000;

        this.init();
    }
    init() {
        this.createScene();
        this.createRenderer();
        this.createControls();

        this.tick();
    }

    createScene(){
        this.scene = new Scene();
        this.scene.background = new THREE.Color( 0xff0000 );
        this.perspectivecamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, this.cameraNear, this.cameraFar);

    }

    createRenderer(){
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });

        this.renderer.domElement.style.width = window.innerWidth.toString() + 'px';
        this.renderer.domElement.style.height = window.innerHeight.toString() + 'px';

        this.renderer.autoClear = true; //true
        this.renderer.shadowMap.enabled = true;
        // renderer.shadowMapAutoUpdate = true;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.type = PCFSoftShadowMap;
        // renderer.setClearColor(0xFFFFFF, 1);
        this.renderer.setClearColor(0x000000, 0.0);
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.toneMapping = NoToneMapping;
        // renderer.toneMappingExposure = 0.5;
        // renderer.toneMappingExposure = Math.pow(0.7, 5.0);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.domElement.appendChild(this.renderer.domElement);
    }

    createControls(){
        this.controls = new OrbitControls(this.perspectivecamera, this.domElement);

        // this.controls.autoRotate = this.__options['spin'];
        this.controls.enableDamping = false;
        this.controls.dampingFactor = 0.1;
        this.controls.maxPolarAngle = Math.PI * 1.0; //Math.PI * 0.35;//Math.PI * 1.0; //
        this.controls.maxDistance = 7500;// 7500; //2500
        this.controls.minDistance = 100; //1000; //1000
        this.controls.screenSpacePanning = true;

        // this.skybox = new Skybox(this, this.renderer);
        this.perspectivecamera.position.set(0, 600, 1500);
        this.controls.update();
    }

    tick(){
      // 获取callback handler
      this.tickId = requestAnimationFrame(this.tick.bind(this));
      // 更新control状态
      this.controls.update();
      // 渲染
      this.renderer.render(this.scene, this.perspectivecamera);
    }
}

export { View3D };