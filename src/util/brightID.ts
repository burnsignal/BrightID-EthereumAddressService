import { toChecksumAddress } from 'web3-utils';
import { BRIGHTID_ENDPOINT } from './constants';


export const getAuthenticated = async () => {
  try {
      const response = await fetch(BRIGHTID_ENDPOINT);
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      const body = await response.json();
      const authenticated = body.data.contextIds.map((address: string) => toChecksumAddress(address));
      return authenticated
  } catch (e) {
      console.error("Error fetching authenticated addresses from BrightID: ", e);
      return [];
  }
}

export const checkAuthenticated = (address: string, authenticated: string[]) => {
    return authenticated.includes(toChecksumAddress(address));
}