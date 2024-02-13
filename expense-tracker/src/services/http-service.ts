import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const abortController = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: abortController.signal,
    });
    return { request, cancel: () => abortController.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  update<T extends Entity>(t: T) {
    return apiClient.patch(this.endpoint + "/" + t.id, t);
  }

  add<T>(t: T) {
    return apiClient.post(this.endpoint, t);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
