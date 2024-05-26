import fetchData from '@/shared/utils/fetch-data';
import { taskEither, TaskEither } from '@/shared/utils/task-either';
import { Either, right, left, isLeft } from '@/shared/utils/either';



type GeoResponse = {
  address: {
    country: string;
  };
};


const geoAdapter = (input: any): GeoResponse => {

  return {
    address: {
      country: input.address.country,
    },
  };
};

const geoValidator = (input: GeoResponse): Either<Error, string> =>
  input.address && input.address.country
    ? right(input.address.country)
    : left(new Error('Country not found'));

const inputValidator = (lat: string, lon: string): Either<Error, void> => {
  if (!lat || !lon) {
    return left(new Error('Latitude and longitude must be provided'));
  }
  return right(undefined);
};

export const getCountryFromCoordinates = (lat: string, lon: string): TaskEither<Error, string> => {
  const inputValidation = inputValidator(lat, lon);
  if (isLeft(inputValidation)) {
    return taskEither(() => Promise.resolve(left(inputValidation.value)));
  }

  return fetchData<GeoResponse, string>(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&format=json&lon=${lon}`,
    geoAdapter,
    geoValidator,
    'GET',
    { 'Content-Type': 'application/json' }
  );
};