import { ErrorMessage } from '@/shared/components/error-message';
import { CountryFromCoordinates, User } from '../types/user';
import { Either, isRight, right, left } from '@/shared/utils/either';
import { TaskEither, taskEither } from '@/shared/utils/task-either';

const ensureHttp = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};

const adaptUser = async (
  input: any,
  geoService: CountryFromCoordinates,
): Promise<Either<Error, User>> => {
  const countryResult = await geoService(
    input.address.geo.lat,
    input.address.geo.lng,
  )();

  const user: User = {
    id: input.id,
    name: input.name,
    username: input.username,
    email: input.email,
    address: {
      street: input.address.street,
      city: input.address.city,
      zipcode: input.address.zipcode,
      country: isRight(countryResult)
        ? countryResult.value
        : ErrorMessage('Country not found'),
    },
    phone: input.phone,
    website: ensureHttp(input.website),
  };

  return right(user);
};

export const userAdapter = (
  input: any,
  geoService: CountryFromCoordinates,
): TaskEither<Error, User> => {
  return taskEither(() => adaptUser(input, geoService));
};
