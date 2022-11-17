export interface ParamInterface {
  name: string;
  description: string;
  default: string | boolean;
  type?: string;
}

export type ParamsType = {
  [key: string]: ParamInterface;
};

export type SelectedParamsType = {
  [key: string]: string | boolean;
};

export type OnChangeParamType = (param: SelectedParamsType) => void;

export type HomeTopType = {
  url: string;
  setUrl: (url: string) => void;
  _fuzzNow: () => void;
};
