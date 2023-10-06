import { convert } from '@/lib/VMDAnimation/vmd2vrmanim';
import { bindToVRM, toOffset } from '@/lib/VMDAnimation/vmd2vrmanim.binding';
import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import IKHandler from '../../lib/VMDAnimation/vrm-ik-handler';
import { VRMAnimation } from '../../lib/VRMAnimation/VRMAnimation';
import { VRMLookAtSmootherLoaderPlugin } from '../../lib/VRMLookAtSmootherLoaderPlugin/VRMLookAtSmootherLoaderPlugin';
import { EmoteController } from '../emoteController/emoteController';
import { LipSync } from '../lipSync/lipSync';
import { Screenplay } from '../messages/messages';

/**
 * 3Dキャラクターを管理するクラス
 */
export class Model {
  public vrm?: VRM | null;
  public mixer?: THREE.AnimationMixer;
  public ikHandler?: any;
  public emoteController?: EmoteController;

  private _lookAtTargetParent: THREE.Object3D;
  private _lipSync?: LipSync;

  constructor(lookAtTargetParent: THREE.Object3D) {
    this._lookAtTargetParent = lookAtTargetParent;
    this._lipSync = new LipSync(new AudioContext());
  }

  public async loadVRM(url: string): Promise<void> {
    const loader = new GLTFLoader();
    loader.register(
      (parser) =>
        new VRMLoaderPlugin(parser, {
          lookAtPlugin: new VRMLookAtSmootherLoaderPlugin(parser),
        }),
    );

    const gltf = await loader.loadAsync(url);

    const vrm = (this.vrm = gltf.userData.vrm);
    vrm.scene.name = 'VRMRoot';

    VRMUtils.rotateVRM0(vrm);
    this.mixer = new THREE.AnimationMixer(vrm.scene);

    this.ikHandler = IKHandler.get(vrm);

    this.emoteController = new EmoteController(vrm, this._lookAtTargetParent);
  }

  public unLoadVrm() {
    if (this.vrm) {
      VRMUtils.deepDispose(this.vrm.scene);
      this.vrm = null;
    }
  }

  /**
   * VRMアニメーションを読み込む
   *
   * https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm_animation-1.0/README.ja.md
   */
  public async loadAnimation(vrmAnimation: VRMAnimation): Promise<void> {
    const { vrm, mixer } = this;
    if (vrm == null || mixer == null) {
      throw new Error('You have to load VRM first');
    }

    const clip = vrmAnimation.createAnimationClip(vrm);
    const action = mixer.clipAction(clip);
    action.play();
  }

  /**
   * 播放舞蹈
   * @param buffer ArrayBuffer
   */
  public async dance(buffer: ArrayBuffer) {
    const { vrm, mixer } = this;
    if (vrm == null || mixer == null) {
      throw new Error('You have to load VRM first');
    }
    const animation = convert(buffer, toOffset(vrm));
    const clip = bindToVRM(animation, vrm);
    const action = mixer.clipAction(clip);
    action.play(); // play animation
  }

  public async stopDance() {
    const { mixer } = this;
    if (mixer == null) {
      throw new Error('You have to load VRM first');
    }
    mixer.stopAllAction();
  }

  /**
   * 音声を再生し、リップシンクを行う
   */
  public async speak(buffer: ArrayBuffer, screenplay: Screenplay) {
    this.emoteController?.playEmotion(screenplay.expression);
    await new Promise((resolve) => {
      this._lipSync?.playFromArrayBuffer(buffer, () => {
        resolve(true);
      });
    });
  }

  public update(delta: number): void {
    if (this._lipSync) {
      const { volume } = this._lipSync.update();
      this.emoteController?.lipSync('aa', volume);
    }

    this.emoteController?.update(delta);
    this.mixer?.update(delta);
    this.vrm?.update(delta);
    this.ikHandler?.update();
  }
}
