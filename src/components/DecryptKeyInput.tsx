import React, {useCallback} from 'react';

import {saveDecryptKey} from '../decrypt_key';

interface Props {
  errorMessage: string;
}

export function DecryptKeyInput(props: Props) {
  const handleFormSubmit = useCallback((evt: React.FormEvent) => {
    evt.preventDefault();
    if (evt.currentTarget instanceof HTMLFormElement) {
      const keyInput = evt.currentTarget.elements.namedItem('key');
      if (keyInput instanceof HTMLInputElement) {
        const value = keyInput.value;
        if (value) {
          saveDecryptKey(value);
          location.reload();
        }
      }
    }
  }, []);
  return (
    <>
      <br />
      {props.errorMessage && <code style={{color: 'red'}}>{props.errorMessage}</code>}
      <br />
      <br />
      <form onSubmit={handleFormSubmit}>
        <label>
          Decrypt key: <input name="key"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
