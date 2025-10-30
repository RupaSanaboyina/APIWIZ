import React, { useState, useEffect } from "react";

const sampleJSON = `{
  "employees": [
    {
      "firstName": "Rupa",
      "lastName": "Sanaboina"
    },
    {
      "firstName": "Naveen",
      "lastName": "Lakku"
    },
    {
      "firstName": "Satyanarayana",
      "lastName": "Sanaboina"
    }
  ]
}`;

function JsonInput({ onGenerate, clearTrigger }) {
  const [text, setText] = useState(sampleJSON);

  useEffect(() => {
    if (typeof clearTrigger === "number" && clearTrigger > 0) {
      setText("");
    }
  }, [clearTrigger]);

  return (
    <div className="json-input-container">
      <textarea
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="json-textarea"
      />
      <button className="generate-btn" onClick={() => onGenerate(text)}>
        Generate Tree
      </button>
    </div>
  );
}

export default JsonInput;
