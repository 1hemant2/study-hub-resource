import React from 'react'
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import { useEffect } from 'react';

const CodeHightLighter = ({ code, language }) => {
    useEffect(() => {
        // Highlight the code when the component mounts
        Prism.highlightAll();
    }, []);
    return (
        <pre>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
    )
}

export default CodeHightLighter;