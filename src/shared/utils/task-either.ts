import { Either } from './either';

export type Task<A> = () => Promise<A>;
export type TaskEither<L, R> = () => Promise<Either<L, R>>;

export const taskEither = <L, R>(task: Task<Either<L, R>>): TaskEither<L, R> => task;
