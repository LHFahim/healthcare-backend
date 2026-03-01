import { ControllersEnum } from './controllers.enum';

export const Routes = {
  [ControllersEnum.AUTH]: {
    login: 'login/email',
    registerByEmail: 'register/email',
    refreshJwtToken: 'refresh-token',
    profile: 'profile',
    logout: 'logout',
  },
  [ControllersEnum.USER]: {
    findAll: '',
    findOne: ':id',
    updateOne: ':id',
    deleteOne: ':id',
  },
} as const;
