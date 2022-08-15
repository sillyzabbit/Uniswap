import { Identify } from '@amplitude/analytics-browser'

/**
 * Electing to leave tracking logic throughout components / hooks
 * seems like the easiest, least invasive solution, is to simply replace calls to amplitude with console logs.
 */

export function initializeAnalytics() {
  console.log('failed to initialize analytics.')
}

/** logs what would've been an event to amplitude. */
export function sendAnalyticsEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  console.log(`[amplitude(${eventName})]: ${JSON.stringify(eventProperties)}`)
}

type Value = string | number | boolean | string[] | number[]

/**
 * Class that exposes methods to mutate the User Model's properties in
 * Amplitude that represents the current session's user.
 *
 * See https://help.amplitude.com/hc/en-us/articles/115002380567-User-properties-and-event-properties
 * for details.
 *
 * afaik only call to amplitude was in the private method
 * public methods just mutating object.
 */
class UserModel {
  private log(method: string, ...parameters: unknown[]) {
    console.debug(`[amplitude(Identify)]: ${method}(${parameters})`)
  }

  private call(mutate: (event: Identify) => Identify) {
    const log = (_: Identify, method: string) => this.log.bind(this, method)
    mutate(new Proxy(new Identify(), { get: log }))
  }

  set(key: string, value: Value) {
    this.call((event) => event.set(key, value))
  }

  setOnce(key: string, value: Value) {
    this.call((event) => event.setOnce(key, value))
  }

  add(key: string, value: number) {
    this.call((event) => event.add(key, value))
  }

  postInsert(key: string, value: string | number) {
    this.call((event) => event.postInsert(key, value))
  }

  remove(key: string, value: string | number) {
    this.call((event) => event.remove(key, value))
  }
}

export const user = new UserModel()
