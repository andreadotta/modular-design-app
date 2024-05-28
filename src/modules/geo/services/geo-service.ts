import fetchData from '@/shared/utils/fetch-data';
import { taskEither, TaskEither } from '@/shared/utils/task-either';
import { Either, right, left, isLeft } from '@/shared/utils/either';

type GeoResponse = {
  address: {
    country: string;
  };
};

const geoAdapter = (input: any): TaskEither<Error, GeoResponse> => {
  const adaptTask = async (): Promise<Either<Error, GeoResponse>> => {
    try {
      const response: GeoResponse = {
        address: {
          country: input.address.country,
        },
      };
      return right(response);
    } catch (error) {
      return left(new Error('Failed to adapt geo response'));
    }
  };

  return taskEither(adaptTask);
};

const geoValidator = (input: GeoResponse): Either<Error, GeoResponse> =>
  input.address && input.address.country
    ? right(input)
    : left(new Error('Country not found'));

const inputValidator = (lat: string, lon: string): Either<Error, void> => {
  if (!lat || !lon) {
    return left(new Error('Latitude and longitude must be provided'));
  }
  return right(undefined);
};

export const getCountryFromCoordinates = (
  lat: string,
  lon: string,
): TaskEither<Error, string> => {
  const inputValidation = inputValidator(lat, lon);
  if (isLeft(inputValidation)) {
    return taskEither(() => Promise.resolve(left(inputValidation.value)));
  }

  return taskEither(async () => {
    const response = await fetchData<GeoResponse>(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&format=json&lon=${lon}`,
      geoAdapter,
      geoValidator,
      'GET',
      { 'Content-Type': 'application/json' },
    )();

    if (isLeft(response)) {
      return left(response.value);
    }

    const country = response.value.address.country;
    return right(country);
  });
};
