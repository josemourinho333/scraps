import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SettingCard from './SettingCard';

export type Setting = {
  years: string[],
  keywords: string[],
};

const Settings = () => {
  const [settings, setSettings] = useState<Setting>({years: [], keywords: []});

  const unwantedContent = (category: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: [...settings[category as keyof Setting], value]
    }));

    axios.post('/api/settings/new', { category, value })
      .then((res) => {
        console.log('res from post', res);
      })
      .catch((err) => console.log('err', err));
  };

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
        unwantedContent={unwantedContent}
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