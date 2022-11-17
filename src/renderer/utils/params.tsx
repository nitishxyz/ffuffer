import { ParamInterface } from 'renderer/types/types';

const params: ParamInterface[] = [
  {
    name: '-p',
    description: 'Delay between requests in seconds',
    default: '',
  },
  {
    name: '-b',
    description: 'Cookie data `"NAME1=VALUE1; NAME2=VALUE2"`',
    default: '',
  },
  {
    name: '-x',
    description: 'Proxy URL (SOCKS5 or HTTP)',
    default: '',
  },
  {
    name: '-maxtime',
    description: 'Maximum running time in seconds',
    default: '0',
  },
  {
    name: '-rate',
    description: 'Rate of requests per second',
    default: '0',
  },
  {
    name: '-ignore-body',
    description: 'Do not fetch the response content',
    default: false,
    type: 'bool',
  },
  {
    name: '-c',
    description: 'Colorize output',
    default: false,
    type: 'bool',
  },
  {
    name: '-mc',
    description: 'Match HTTP status codes',
    default: '200,204,301,302,307,401,403,405',
  },
  {
    name: '-ml',
    description: ' Match amount of lines in response',
    default: '',
  },
  {
    name: '-mr',
    description: 'Match regexp',
    default: '',
  },
  {
    name: '-ms',
    description: 'Match HTTP response size',
    default: '',
  },
  {
    name: '-mw',
    description: 'Match amount of words in response',
    default: '',
  },
];

export default params;
