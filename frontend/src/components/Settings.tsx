import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SettingCard from './SettingCard';

export type Setting = {
  years: string[],
  words: string[],
};

const Settings = () => {
  const [settings, setSettings] = useState<Setting>({years: [], words: []});

  useEffect(() => {
    axios.get("/api/settings")
      .then((res) => {
        setSettings({...res.data[0].data})
      })
      .catch((err) => console.log('settings fetch err', err));
  }, []);

  const cards = Object.keys(settings).map((setting, index) => {
    return (
      <SettingCard 
        key={index}
        title={setting}
        values={settings[setting as keyof Setting]}
      />
    )
  });

  return (
    <div className='flex flex-col items-center m-5'>
      <div className="text-2xl font-bold">Excluded Content</div>
      {cards}
    </div>
  )
}

export default Settings;