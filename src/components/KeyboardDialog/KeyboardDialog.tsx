import React from 'react';
import { IconButton } from '../Mui/IconButton';
import { Dialog } from '../Mui/Dialog';
import { useBoolean } from '../../utils/useBoolean';
import KeyboardIcon from '@material-ui/icons/KeyboardOutlined';
import CloseIcon from '@material-ui/icons/Close';

interface ShortcutMap {
  [key: string]: {
    keys: string;
    desc: string;
  };
}

interface Props {
  shortcuts?: ShortcutMap;
}

export function KeyboardDialog({ shortcuts = {} }: Props) {
  const [dialogOpened, { on, off }] = useBoolean();

  return (
    <>
      <IconButton icon={KeyboardIcon} onClick={on} />
      <Dialog
        open={dialogOpened}
        onClose={off}
        maxWidth="xs"
        className="keyboard-dialog"
      >
        <div className="keyborad-dialog-header">
          <h3>快捷鍵</h3>
          <div>
            <CloseIcon onClick={off} />
          </div>
        </div>
        {Object.entries(shortcuts).map(([type, { keys, desc }]) => (
          <div key={type} className="row">
            <div className="desc">{desc}</div>
            <div className="key">{keys.replace(/\//g, ' / ')}</div>
          </div>
        ))}
      </Dialog>
    </>
  );
}
