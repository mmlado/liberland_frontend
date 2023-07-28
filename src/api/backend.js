import axios from 'axios';
import { ethers } from 'ethers';

export const getAddressLLM = async (walletAddress) => {
  const ssoAccessTokenHash = sessionStorage.getItem('ssoAccessTokenHash');

  const api2 = axios.create({
    baseURL: process.env.REACT_APP_API2,
    withCredentials: true,
  });
  api2.defaults.headers.common['X-Token'] = ssoAccessTokenHash;

  const { data } = await api2.get('/users', {
    params: {
      blockchainAddress: walletAddress,
      limit: 1,
    },
  });

  return ethers.utils.parseUnits(data[0].merits.toFixed(12), 12).toString();
};
