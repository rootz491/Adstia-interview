import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

export const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
