import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { capitalizeWord } from '../helpers/helpers';

type Props = {
  title: string,
  values: string[],
  unwantedContent: (category: string, value: string) => void,
};

const SettingCard = ({title, values, unwantedContent}: Props) => {
  const [input, setInput] = useState<any>({
    category: title,
    value: '',
  });

  const prettyTitle = capitalizeWord(title);

  return (
    <div className="card w-96 bg-base-100 shadow-xl my-3">
      <div className="card-body">
        <h2 className="card-title">{prettyTitle}</h2>
        <div className='flex flex-wrap'>
          { values.map((value, index) => {
            return (
              <div key={index} className="badge mr-1 mb-1 flex items-center align-center justify-center">
                <XMarkIcon 
                  className='w-3 h-3 text-primary-content leading-none mr-1' 
                />
                {value}
              </div>
            )
          })}
        </div>
        <div className="card-actions justify-between items-center mt-2">
          <input 
            type="text" 
            placeholder="Enter xxx to exclude" 
            className="input input-bordered input-sm w-2/4 max-w-xs" 
            value={input.value} 
            onChange={(e) => setInput((prev: any) => ({...prev, value: e.target.value}))} 
          />
          <div className="exclude-button flex items-center">
            <button 
              className="btn btn-primary btn-sm mx-1"
              onClick={() => {
                unwantedContent(input.category, input.value);
                setInput((prev: any) => ({...prev, value: ''}));
              }}
            >
              <PlusIcon className='w-5 h-5 text-primary-content'/>
            </button>
            {/* <button className="btn btn-primary btn-sm">Update</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingCard;