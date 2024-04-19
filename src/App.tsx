import React from 'react';
import Select from './components/Select';

function App() {
  const bunchOfChoices = [...Array(100).keys()].map(String);
  const options = [
    "purple",
    "another one",
    "choice one",
    "choice two",
    ...bunchOfChoices,
  ]


  return (
    <div className="space-y-4 p-2">
      <Select label={"Single Select"}
        options={options}
      />
      <Select label={"Multi-select"}
        options={options}
        isMultiSelect={true}
      />
    </div>
  );
}

export default App;
