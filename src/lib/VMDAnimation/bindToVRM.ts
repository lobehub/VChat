import {
  AnimationClip,
  NumberKeyframeTrack,
  QuaternionKeyframeTrack,
  VectorKeyframeTrack,
} from 'three';
import IKHandler from './vrm-ik-handler';

// bindToVRM returns a new AnimationClip with the given animation and vrm.
export const bindToVRM = (data, vrm) => {
  const tracks = [];
  for (const { type, name, isIK, times, values } of data.timelines) {
    // get the srcName for timeline
    let srcName;
    switch (type) {
      case 'morph': {
        const track = vrm.blendShapeProxy?.getBlendShapeTrackName(name);
        if (!track) continue;
        srcName = track;
        break;
      }
      case 'position':
      case 'rotation': {
        if (isIK) {
          const handler = IKHandler.get(vrm);
          const target = handler.getAndEnableIK(name);
          if (!target) continue;
          srcName = target.name;
        } else {
          const bone = vrm.humanoid?.getRawBone(name);
          if (!bone) continue;
          srcName = bone.node.name;
        }
        break;
      }
      default:
        continue;
    }

    // add timeline to tracks based on type
    switch (type) {
      case 'morph':
        tracks.push(new NumberKeyframeTrack(srcName, times, values));
        break;
      case 'position':
        tracks.push(new VectorKeyframeTrack(`${srcName}.position`, times, values));
        break;
      case 'rotation':
        tracks.push(new QuaternionKeyframeTrack(`${srcName}.quaternion`, times, values));
        break;
      default:
    }
  }
  return new AnimationClip(`clip${Date.now()}`, data.duration, tracks);
};
