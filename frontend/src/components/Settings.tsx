import React, { useState, useEffect } from 'react';
import axios from 'axios';

export type Settings = {
  years: number[],
  words: string[],
};

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({years: [], words: []});

  useEffect(() => {
    axios.get("/api/settings")
      .then((res) => {
        setSettings({...res.data[0].data})
      })
      .catch((err) => console.log('settings fetch err', err));
  }, [])

  return (
    <div>Settings</div>
  )
}

export default Settings;