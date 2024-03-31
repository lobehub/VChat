import { Parser } from 'mmd-parser';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Model } from './model';

/**
 * three.jsを使った3Dビューワー
 *
 * setup()でcanvasを渡してから使う
 */
export class Viewer {
  public isReady: boolean;
  public model?: Model;

  private _renderer?: THREE.WebGLRenderer;
  private _clock: THREE.Clock;
  private _scene: THREE.Scene;
  private _cameraHelper?: THREE.CameraHelper;
  private _camera?: THREE.PerspectiveCamera;
  private _cameraControls?: OrbitControls;

  constructor() {
    this.isReady = false;

    // scene
    const scene = new THREE.Scene();
    this._scene = scene;

    // light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1.0, 1.0, 1.0).normalize();
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // const ambiantLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // ambiantLight.position.set(0, 20, 0);
    // scene.add(ambiantLight);

    // animate
    this._clock = new THREE.Clock();
    this._clock.start();
  }

  /**
   * 加载舞台
   * @param url
   */
  public async loadStage(buffer: ArrayBuffer) {
    const pmx = new Parser().parsePmx(buffer);
    this._scene.add(pmx);
  }

  public loadVrm(url: string) {
    if (this.model?.vrm) {
      this.unloadVRM();
    }

    // gltf and vrm
    this.model = new Model(this._camera || new THREE.Object3D());
    this.model.loadVRM(url).then(async () => {
      if (!this.model?.vrm) return;

      // Disable frustum culling
      this.model.vrm.scene.traverse((obj) => {
        obj.frustumCulled = false;
      });

      this._scene.add(this.model.vrm.scene);
      await this.model.loadIdleAnimation();

      // HACK: アニメーションの原点がずれているので再生後にカメラ位置を調整する
      requestAnimationFrame(() => {
        this.resetCamera();
      });
    });
  }

  public unloadVRM(): void {
    if (this.model?.vrm) {
      this._scene.remove(this.model.vrm.scene);
      this.model?.unLoadVrm();
    }
  }

  /**
   * Rectで管理しているCanvasを後から設定する
   */
  public setup(canvas: HTMLCanvasElement) {
    const parentElement = canvas.parentElement;
    const width = parentElement?.clientWidth || canvas.width;
    const height = parentElement?.clientHeight || canvas.height;
    // renderer
    this._renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    this._renderer.outputEncoding = THREE.sRGBEncoding;
    this._renderer.setSize(width, height);
    this._renderer.setPixelRatio(window.devicePixelRatio);

    // camera 全身
    this._camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 20.0);
    this._camera.position.set(0, 1.3, 1.3);
    this._cameraControls?.target.set(0, 1.3, 0);

    // Camera 上半身
    // this._camera = new THREE.PerspectiveCamera(20.0, width / height, 0.1, 20.0);
    // this._camera.position.set(0, 1.3, 1.5);
    // this._cameraControls?.target.set(0, 1.3, 0);

    this._cameraControls?.update();

    // camera controls
    this._cameraControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._cameraControls.screenSpacePanning = true;
    this._cameraControls.update();

    // this._cameraHelper = new THREE.CameraHelper(this._camera);
    // this._scene.add(this._cameraHelper);

    // floor
    // const floor = new Mesh(
    //   new PlaneGeometry(100, 100),
    //   new MeshLambertMaterial({
    //     color: 0x999999,
    //     depthWrite: true,
    //   }),
    // );
    // floor.position.y = -0.5;
    // floor.rotation.x = -Math.PI / 2;

    // this._scene.add(floor);

    // grid
    // const grid = new GridHelper(50, 100, 0xaaaaaa, 0xaaaaaa);
    // this._scene.add(grid);

    window.addEventListener('resize', () => {
      this.resize();
    });
    this.isReady = true;
    this.update();
  }

  /**
   * canvasの親要素を参照してサイズを変更する
   */
  public resize() {
    if (!this._renderer) return;

    const parentElement = this._renderer.domElement.parentElement;
    if (!parentElement) return;

    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(parentElement.clientWidth, parentElement.clientHeight);

    if (!this._camera) return;
    this._camera.aspect = parentElement.clientWidth / parentElement.clientHeight;
    this._camera.updateProjectionMatrix();
  }

  public resetCamera() {
    const chestNode = this.model?.vrm?.humanoid.getNormalizedBoneNode('chest');

    if (chestNode) {
      const chestWPos = chestNode.getWorldPosition(new THREE.Vector3());
      this._camera?.position.set(this._camera.position.x, chestWPos.y, this._camera.position.z);
      this._cameraControls?.target.set(chestWPos.x, chestWPos.y, chestWPos.z);
      this._cameraControls?.update();
    }
  }

  public update = () => {
    requestAnimationFrame(this.update);
    const delta = this._clock.getDelta();
    // update vrm components
    if (this.model) {
      this.model.update(delta);
    }
    if (this._cameraHelper) {
      this._cameraHelper.update();
    }

    if (this._renderer && this._camera) {
      this._renderer.render(this._scene, this._camera);
    }
  };
}
