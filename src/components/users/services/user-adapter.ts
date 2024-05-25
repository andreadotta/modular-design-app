import { User } from '../types/user';
import { Either, isRight, right, left } from '@/shared/utils/either';
import { TaskEither, taskEither } from '@/shared/utils/task-either';
import { getCountryFromCoordinates } from '../../geo/service/get-service';

const ensureHttp = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};
const adaptUser = async (input: any): Promise<Either<Error, User>> => {
  const countryResult = await getCountryFromCoordinates(input.address.geo.lat, input.address.geo.lng)();
  
  const user: User = {
    id: input.id,
    name: input.name,
    username: input.username,
    email: input.email,
    address: {
      street: input.address.street,
      city: input.address.city,
      zipcode: input.address.zipcode,
      country: isRight(countryResult) ? countryResult.value : undefined,
    },
    phone: input.phone,
    website:  ensureHttp(input.website),
  };

  return right(user);
};

export const userAdapter = (input: any): TaskEither<Error, User> => {
  return taskEither(() => adaptUser(input));
};
