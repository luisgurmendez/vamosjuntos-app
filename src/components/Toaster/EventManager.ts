class EventManager {
  private eventList = new Map();

  public on(event: null | string, callback: any) {
    this.eventList.has(event) || this.eventList.set(event, []);
    this.eventList.get(event).push(callback);
    return this;
  }

  public off(event: null | string = null) {
    return this.eventList.delete(event);
  }

  public emit(event: null | string, ...args: any[]) {
    if (!this.eventList.has(event)) {
      return false;
    }

    this.eventList.get(event).forEach((callback: any) => setTimeout(() => callback.call(this, ...args), 0));

    return this;
  }
}

export default EventManager;
