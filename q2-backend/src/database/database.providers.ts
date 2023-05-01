import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://test:rootz491@cluster0.3usnk.mongodb.net/interview?retryWrites=true&w=majority',
      ),
  },
];
