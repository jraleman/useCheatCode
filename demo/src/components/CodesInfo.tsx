import React from 'react';
import { CheatCode } from '../useCheatCodes';
import konamiCode from '../assets/konami-code.png';

const CodesInfo = ({ cheatCodes, activeCheats, displayCodes }: ICodesInfo) => {
  if (!displayCodes) {
    return <img src={konamiCode} className="konami-code" alt="konami-code" />;
  }
  return (
    <div>
      <h2>Active Cheats:</h2>
      {activeCheats?.map(({ name }: { name: string }) => (
        <pre key={name} className="cheat-name">
          <code>{`~ ${name} ~`}</code>
        </pre>
      ))}
      <h3>Cheat Codes:</h3>
      <code className="cheat-code">
        {JSON.stringify(cheatCodes, null, 2)}
      </code>
    </div>
  )
};

interface ICodesInfo {
  cheatCodes: CheatCode[];
  activeCheats: CheatCode[];
  displayCodes: boolean;
}

export default CodesInfo;
