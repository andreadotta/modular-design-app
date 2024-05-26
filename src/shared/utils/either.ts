export type Either<L, R> = { _tag: 'Left'; value: L } | { _tag: 'Right'; value: R };

export const left = <L, R>(value: L): Either<L, R> => ({ _tag: 'Left', value });
export const right = <L, R>(value: R): Either<L, R> => ({ _tag: 'Right', value });

export const isLeft = <L, R>(e: Either<L, R>): e is { _tag: 'Left'; value: L } => e._tag === 'Left';
export const isRight = <L, R>(e: Either<L, R>): e is { _tag: 'Right'; value: R } => e._tag === 'Right';
