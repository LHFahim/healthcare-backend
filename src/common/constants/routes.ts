import { ControllersEnum } from './controllers.enum';

export const Routes = {
  [ControllersEnum.AUTH]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
    logout: 'logout',
  },
  [ControllersEnum.USERS]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
    profile: 'profile',
  },
} as const;
