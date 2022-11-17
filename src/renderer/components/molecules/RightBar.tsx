import React from 'react';

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  OnChangeParamType,
  ParamInterface,
  SelectedParamsType,
} from 'renderer/types/types';
import params from 'renderer/utils/params';

type RightBarType = {
  onChange: OnChangeParamType;
  selectedParams: SelectedParamsType;
  onWordList: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wordList: string;
};

const RightBar: React.FC<RightBarType> = ({
  onChange,
  selectedParams,
  onWordList,
  wordList,
}) => {
  return (
    <>
      <Button variant="contained" component="label">
        Choose WordList
        <input id="wordList" type="file" onChange={onWordList} hidden />
      </Button>
      <div
        style={{
          width: '100%',
          overflow: 'scroll',
          color: '#fff',
          fontSize: 12,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <pre>{wordList}</pre>
      </div>
      {params.map((param: ParamInterface) => {
        return (
          <div key={JSON.stringify(param)}>
            <div style={{ height: 15 }} />
            {param.type === 'bool' ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {param.name} {param.description}
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedParams[param.name] || param.default}
                  label={param.name}
                  onChange={(e) => {
                    onChange({
                      [param.name]: e.target.value || param.default,
                    });
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <div className="adornment-right-input">{param.name}</div>
                    </InputAdornment>
                  }
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <TextField
                variant="outlined"
                label={param?.description}
                className="right-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className="adornment-right-input">{param.name}</div>
                    </InputAdornment>
                  ),
                }}
                size="small"
                value={selectedParams[param.name] || ''}
                placeholder={param.default?.toString()}
                key={param.name}
                onChange={(e) => {
                  if (e.target.value === '') {
                    onChange({ [param.name]: 'null' });
                  } else {
                    onChange({ [param.name]: e.target.value });
                  }
                }}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default RightBar;
