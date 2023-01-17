import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;

    const endpoint = `details/fighter/${id}.json`;

    try {
      const apiDetails = await callApi(endpoint, 'GET');
      return apiDetails;
    } catch (error) {
      console.warn(error);
      alert(`При отриманні інформації про бійця сталася помилка:\n${error}`);
    }
  }
}

export const fighterService = new FighterService();
