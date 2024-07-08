/**
@fileoverview 
Implementazione di un EventBus con buffer degli eventi e scope.
@description

Italiano:
Questo modulo implementa un sistema di EventBus con le seguenti caratteristiche chiave:

EventBuffer:
L'eventBuffer è un meccanismo che memorizza temporaneamente gli eventi emessi
prima che ci siano listener registrati per quegli eventi.

Funziona così:
Quando viene emesso un evento, viene aggiunto all'eventBuffer.
Quando un nuovo listener si registra, il sistema controlla l'eventBuffer per eventuali 
eventi corrispondenti e li esegue immediatamente.
Questo assicura che nessun evento venga perso, anche se emesso prima della registrazione dei listener.

Scope:
Lo scope è un identificatore univoco assegnato a ogni istanza di EventBus.

Serve a:
Isolare gli eventi di diverse parti dell'applicazione.
Prevenire conflitti tra eventi con lo stesso nome in diverse aree.
Facilitare il debug tracciando da quale parte dell'app provengono gli eventi.
Gli eventi sono identificati con il prefisso dello scope, garantendo l'isolamento tra diversi EventBus.

English:
This module implements an EventBus system with the following key features:

EventBuffer:
The eventBuffer is a mechanism that temporarily stores emitted events
before there are listeners registered for those events.

It works as follows:
When an event is emitted, it's added to the eventBuffer.
When a new listener registers, the system checks the eventBuffer 
for any matching events and executes them immediately.
This ensures that no events are lost, even if emitted before listeners are registered.

Scope:
The scope is a unique identifier assigned to each EventBus instance.

It serves to:
Isolate events from different parts of the application.
Prevent conflicts between events with the same name in different areas.
Facilitate debugging by tracing which part of the app events come from.
Events are identified with the scope prefix, ensuring isolation between different EventBuses.

*/

/**
 * Enum defining the types of event keys.
 */
enum BaseEventKeys {
  error = 'error',
}

interface BaseEvents {
  [BaseEventKeys.error]: Error;
}

/**
 * Type for the event callback function.
 */
type EventCallback<T> = (data: T) => void;

/**
 * Interface for the EventBus methods.
 */
export interface EventBus<T> {
  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void;
  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
}

type EventQueueItem<T> = { event: keyof T; data: T[keyof T] };

/**
 * Functional implementation of EventBus with a queue to manage events.
 */
export const createEventBus = <T extends BaseEvents>(
  scope: string,
): EventBus<T> => {
  const eventBuffer: EventQueueItem<T>[] = [];
  let events: { [K in keyof T]?: EventCallback<T[K]>[] } = {};
  let queue: EventQueueItem<T>[] = [];
  let processing = false;

  const processQueue = () => {
    if (processing || queue.length === 0) return;
    processing = true;

    const { event, data } = queue.shift()!;
    const eventCallbacks = events[event];

    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => callback(data));
    }

    processing = false;
    processQueue();
  };

  const on: EventBus<T>['on'] = (event, callback) => {
    const scopedEvent = `${scope}:${String(event)}`;
    const typedScopedEvent = scopedEvent as unknown as keyof T; // Tipo cast esplicito

    events = {
      ...events,
      [typedScopedEvent]: [...(events[typedScopedEvent] || []), callback],
    };

    // Process buffered events
    eventBuffer.forEach((item) => {
      if (item.event === typedScopedEvent) {
        callback(item.data as T[typeof event]); // Cast esplicito per assicurare il tipo corretto
      }
    });
  };

  const off: EventBus<T>['off'] = (event, callback) => {
    const scopedEvent = `${scope}:${String(event)}`;
    const typedScopedEvent = scopedEvent as unknown as keyof T; // Tipo cast esplicito

    const eventCallbacks = events[typedScopedEvent]?.filter(
      (cb) => cb !== callback,
    );
    events = {
      ...events,
      [typedScopedEvent]: eventCallbacks?.length ? eventCallbacks : undefined,
    };
  };

  const emit: EventBus<T>['emit'] = (event, data) => {
    const scopedEvent = `${scope}:${String(event)}`;
    const typedScopedEvent = scopedEvent as unknown as keyof T; // Tipo cast esplicito

    queue = [...queue, { event: typedScopedEvent, data }];
    console.log(`Event emitted: ${scopedEvent}`, data);
    eventBuffer.push({ event: typedScopedEvent, data });
    processQueue();
  };

  return { on, off, emit };
};
