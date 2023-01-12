import axios from 'axios';
import { FB_URL } from './constant';

axios.defaults.baseURL = FB_URL;

export default axios;
