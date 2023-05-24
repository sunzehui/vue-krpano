export class Events {
  private _events: { [key: string]: Function[] } = {}

  public on(event: string, callback: Function): void {
    if (!this._events[event])
      this._events[event] = []

    this._events[event].push(callback)
  }

  public off(event: string, callback: Function): void {
    if (!this._events[event])
      return

    this._events[event] = this._events[event].filter(cb => cb !== callback)
  }

  public emit(event: string, ...args: any[]): void {
    if (!this._events[event])
      return

    this._events[event].forEach(cb => cb(...args))
  }
}

const events = new Events()

export {
  events,
}
