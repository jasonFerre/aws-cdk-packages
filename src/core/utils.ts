import * as deepmerge from 'deepmerge';
import * as log from 'npmlog';
import { flagOverriddenDefaults } from './override-warning-service';

function isObject(val: object) {
  return val != null && typeof val === 'object'
    && Object.prototype.toString.call(val) === '[object Object]';
}

function isPlainObject(o: object) {
  if (Array.isArray(o) === true) {
    return true;
  }

  if (isObject(o) === false) {
    return false;
  }

  // If has modified constructor
  const ctor = o.constructor;
  if (typeof ctor !== 'function') {
    return false;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

function combineMerge(target: any[], source: any[]) {
  return target.concat(source);
}

function overwriteMerge(target: any[], source: any[]) {
  target = source;
  return target;
}

export function printWarning(message: string) {
  // Style the log output
  log.prefixStyle.bold = true;
  log.prefixStyle.fg = 'red';
  log.enableColor();
  log.warn('ACCELERATOR_CONSTRUCTS_WARNING: ', message);
}

export function overrideProps(DefaultProps: object, userProps: object, concatArray: boolean = false): any {
  // Notify the user via console output if defaults are overridden
  const overrideWarningsEnabled = (process.env.overrideWarningsEnabled !== 'false');
  if (overrideWarningsEnabled) {
    flagOverriddenDefaults(DefaultProps, userProps);
  }
  // Override the sensible defaults with user provided props
  if (concatArray) {
    return deepmerge(DefaultProps, userProps, {
      arrayMerge: combineMerge,
      isMergeableObject: isPlainObject,
    });
  } else {
    return deepmerge(DefaultProps, userProps, {
      arrayMerge: overwriteMerge,
      isMergeableObject: isPlainObject,
    });
  }
}