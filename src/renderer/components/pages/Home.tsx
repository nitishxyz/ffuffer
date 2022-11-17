import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import './Home.css';
import './xterm.css';

import { FitAddon } from 'xterm-addon-fit';

import { Terminal } from 'xterm';
import { HomeTopType, SelectedParamsType } from 'renderer/types/types';
import { Link } from '@mui/icons-material';

import params from 'renderer/utils/params';
import RightBar from '../molecules/RightBar';

const { spawn } = window.require('child_process');

const boolParam = (p: string) => {
  const idx = params.findIndex((param) => param.name === p);
  // console.log('checking bool param', p, idx, params[idx].type);

  if (idx > -1) {
    if (params[idx].type === 'bool') {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

const fitAddon = new FitAddon();

const Home = () => {
  const [url, setUrl] = React.useState('https://{fuzz}.google.com');
  const [result, setResult] = React.useState('');
  const [cFuzzer, setCFuzzer] = React.useState(null);
  const [newTerm, setTerm] = React.useState<Terminal | null>(null);
  const [newTerm1, setTerm1] = React.useState<Terminal | null>(null);
  const [selectedParams, setAllPararms] = React.useState<SelectedParamsType>(
    {}
  );
  const [wordList, setWordList] = React.useState(
    '/Users/nick/nick/dev/cybersec/SecLists/Discovery/Web-Content/common.txt'
  );

  const onChangeParam = (param: SelectedParamsType) => {
    const theParams: SelectedParamsType = { ...selectedParams };
    const key = Object.keys(param)[0];

    const val = Object.values(param)[0];
    if (val === 'null') {
      delete theParams[key];
    } else {
      theParams[key] = val;
    }
    setAllPararms(theParams);
  };

  const createTerm1 = () => {
    const term1 = new Terminal({
      convertEol: true,
    });

    // Styling
    term1.setOption('theme', {
      background: 'black',
      foreground: 'white',
    });

    document.getElementById('xterm1').innerHTML = '';

    term1.loadAddon(fitAddon);

    term1.open(document.getElementById('xterm1'));

    term1.write('Your results will appear here\n\n');

    fitAddon.fit();

    setTerm1(term1);
  };

  useEffect(() => {
    const term = new Terminal({
      convertEol: true,
    });

    // Styling
    term.setOption('theme', {
      background: 'black',
      foreground: 'white',
    });

    document.getElementById('xterm').innerHTML = '';

    term.loadAddon(fitAddon);

    term.open(document.getElementById('xterm'));

    term.write('Welcome to Fuzzer\n\n');
    term.write('Enter a Url and press Fuzz\n');
    term.write('Select a WordList.txt of you choice\n');
    term.write('Replace the part with {fuzz}, that you want to fuzz\n');

    fitAddon.fit();

    setTerm(term);

    createTerm1();

    return () => {};
  }, []);

  const onKill = () => {
    console.log('kill', cFuzzer);

    cFuzzer?.kill();
  };

  const fuzzNow = () => {
    setResult('');
    newTerm?.clear();
    newTerm1?.clear();
    newTerm1?.write('Your results will appear here\n\n');

    if (!url) {
      return;
    }
    const fuzzUrl = url.replace('{fuzz}', 'FUZZ');
    onKill();
    const oParams: (string | boolean)[] = [];

    // console.log(selectedParams);

    Object.keys(selectedParams).forEach((p) => {
      // console.log('p: ', p);
      if (boolParam(p)) {
        if (selectedParams[p]) {
          oParams.push(p);
        }
      } else {
        oParams.push(p);
        oParams.push(selectedParams[p]);
      }
    });

    // console.log(oParams);

    const fuzzer = spawn('ffuf', ['-w', wordList, '-u', fuzzUrl, ...oParams]);
    setCFuzzer(fuzzer);
    fuzzer?.stdout.on('data', (data: string) => {
      // setResult(result + `<div class="line">${data}</div>`);
      newTerm1?.write(data);
    });
    fuzzer?.stderr.on('data', (data: string) => {
      newTerm?.write(data);
    });
    fuzzer?.on('error', (error: Error) => {
      console.log(`error: ${error.message}`);
    });
    fuzzer?.on('close', (code: string) => {
      console.log(`child process exited with code ${code}`);
      alert(`child process exited with code ${code}`);
    });
  };

  const onWordListChange = (e) => {
    var x = document.getElementById('wordList').files[0].path;

    if (x?.endsWith('.txt')) {
      setWordList(x);
    } else {
      alert('Not a wordlist or txt file');
    }
  };

  // console.log('sult: ', Object.values(result));

  return (
    <Box className="home-out">
      <Box className="home-top">
        <HomeTop url={url} setUrl={setUrl} _fuzzNow={fuzzNow} />
      </Box>
      <Box className="home-container">
        <Box className="left">
          <Button variant="outlined" color="error" onClick={onKill}>
            STOP
          </Button>
        </Box>
        <Box id="mid" className="mid">
          <div id="xterm" />
          <div style={{ width: '100%', height: 1, backgroundColor: '#888' }} />
          <div id="xterm1" />
        </Box>
        <Box className="right">
          <RightBar
            onChange={onChangeParam}
            selectedParams={selectedParams}
            onWordList={onWordListChange}
            wordList={wordList}
          />
        </Box>
      </Box>
    </Box>
  );
};

const HomeTop: React.FC<HomeTopType> = ({ url, setUrl, _fuzzNow }) => {
  return (
    <Box className="home-top-con">
      <Box className="home-top-left">
        <TextField
          variant="outlined"
          label="Enter URL to fuzz"
          className="url-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Link />
              </InputAdornment>
            ),
          }}
          size="small"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          onSubmit={_fuzzNow}
        />
      </Box>
      <Box className="home-top-right">
        <Button variant="outlined" color="primary" onClick={_fuzzNow}>
          Fuzz
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
