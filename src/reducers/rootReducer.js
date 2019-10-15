import {
  CHANGE_DIAL,
  CHANGE_WAVEFORM,
  CHANGE_FILTER_TYPE,
  SAW_START,
  TRIGGER_MASTER,
  TRIGGER_ATTACK,
  TRIGGER_RELEASE,
  NOTE_PRESS,
  NOTE_RELEASE
} from "../actions/types";

import * as dotProp from "dot-prop-immutable";
import initialState from "./initialState";

import SynthVoice from "../synth/SynthVoice";
import SynthEngine from "../synth/SynthEngine";

const synth = new SynthEngine(initialState);
const voice = new SynthVoice(initialState);

// const rootReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case 'NOTE_ON':
//       state = Object.assign({}, state);
//       state.downKeys.push(action.key);
//       state.events.push(action);
//       return state;

//     case 'NOTE_OFF':
//       state = Object.assign({}, state);
//       state.downKeys = state.downKeys
//         .filter(key => key !== action.key);
//       state.events.push(action);
//       return state;

//     case 'CLEAR_EVENT_QUEUE':
//       state = Object.assign({}, state);
//       state.events = [];

//     default:
//       return state;
//   }
// }

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIAL:
      synth.updateSetting(action.payload.name, action.payload.dialValue);

      return dotProp.set(
        state,
        `${action.payload.parentName}.${action.payload.name}`,
        action.payload.dialValue
      );

    case CHANGE_WAVEFORM:
      synth.updateSetting(action.payload.name, action.payload.selectValue);

      return dotProp.set(
        state,
        `${action.payload.parentName}.${action.payload.name}`,
        action.payload.selectValue
      );

    case CHANGE_FILTER_TYPE:
      synth.updateSetting("filterType", action.payload);

      return dotProp.set(state, `filter.filterType`, action.payload);


      case NOTE_PRESS:
        voice.triggerSawStart(action.payload);
        return dotProp.set(state, "sawStart.frequency", action.payload);

        case NOTE_RELEASE:
      voice.triggerSawStart(action.payload);
      return dotProp.set(state, "sawStart.frequency", action.payload);

    case SAW_START:
      synth.triggerSawStart(action.payload);
      return dotProp.set(state, "sawStart.frequency", action.payload);

    case TRIGGER_MASTER:
      synth.triggerAttackRelease(action.payload, "8n");
      return dotProp.set(state, "triggerMaster.note", action.payload);

    case TRIGGER_ATTACK:
      synth.triggerAttack(action.payload);
      return dotProp.set(state, "triggerAttack.note", action.payload);

    case TRIGGER_RELEASE:
      synth.triggerRelease();
      return dotProp.set(state, "triggerRelease.note", action.payload);

    default:
      return state;
  }
};

export default rootReducer;
