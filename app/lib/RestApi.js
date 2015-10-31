import axios from 'axios';
import AuthStore from '../stores/AuthStore';
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

class RestApi {
  get(path, options) {
    return axios.get(this.buildUrl(path), this.buildRequestOptions(options)).catch(this.onError);
  }

  post(path, data, options) {
    return axios.post(this.buildUrl(path), data, this.buildRequestOptions(options)).catch(this.onError);
  }

  put(path, data, options) {
    return axios.put(this.buildUrl(path), data, this.buildRequestOptions(options)).catch(this.onError);
  }

  delete(path, options) {
    return axios.delete(this.buildUrl(path), this.buildRequestOptions(options)).catch(this.onError);
  }

  buildUrl(path) {
    return `${apiBaseUrl}${path}`;
  }

  buildRequestOptions(options) {
    let data = Object.assign({}, options);
    return data;
  }

  onError(res) {
    if (typeof location != 'undefined') {
      if (res.status === 401) return location.href = '/login';
    }
    throw res;
  }
}

export default new RestApi();
