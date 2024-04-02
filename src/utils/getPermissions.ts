import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

type PossiblePermission = 'camera' | 'photoLibrary';
type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

const androidPermission = {
  camera: PERMISSIONS.ANDROID.CAMERA,
  photoLibrary: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};

const iosPermission = {
  camera: PERMISSIONS.IOS.CAMERA,
  photoLibrary: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const permissionsPerOS = Platform.OS === 'ios' ? iosPermission : androidPermission;

export const getPermissions = async (
  permission: PossiblePermission,
  onSuccess?: () => void,
  onFailed?: () => void,
  essential = false,
): Promise<boolean> => {
  const needPermission = permissionsPerOS[permission];

  const handlePermissionSuccess = () => {
    if (onSuccess) onSuccess();

    return true;
  };

  const handlePermissionError = () => {
    if (onFailed) onFailed();
    return false;
  };

  let requested: PermissionStatus;

  const checked = await check(needPermission);
  switch (checked) {
    case RESULTS.UNAVAILABLE:
      return handlePermissionError();
    case RESULTS.GRANTED:
      return handlePermissionSuccess();
    case RESULTS.DENIED:
      requested = await request(needPermission);
      if (requested === RESULTS.GRANTED) return handlePermissionSuccess();
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
    default:
      return handlePermissionError();
  }
};
