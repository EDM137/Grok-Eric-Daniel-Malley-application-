import React from 'react';

interface CodeBlockProps {
  content: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
  const highlightSyntax = (text: string): { __html: string } => {
    let highlightedText = text
      // Escape HTML to prevent XSS if content were ever user-generated
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 1. Highlight comments (lines starting with # or //)
    highlightedText = highlightedText.replace(/(#.*|\/\/.*)/g, '<span class="text-gray-500">$1</span>');

    // 2. Highlight strings (in single or double quotes)
    highlightedText = highlightedText.replace(/("[^"]*"|'[^']*')/g, '<span class="text-yellow-300">$1</span>');

    // 3. Highlight sovereign and common keywords
    const keywords = [
      'double quadruple helix', 'zero-point energy', 'emotional pow', 
      'const', 'let', 'var', 'function', 'return', 'import', 'from', 'class', 
      'if', 'else', 'for', 'while', 'def', 'await', 'async'
    ];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    highlightedText = highlightedText.replace(keywordRegex, '<span class="text-cyan-400 font-semibold">$1</span>');

    // 4. Highlight numbers
    highlightedText = highlightedText.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="text-indigo-400">$1</span>');

    // 5. Highlight function/method calls (e.g., .myFunction() )
    highlightedText = highlightedText.replace(/\.([a-zA-Z_]\w*)\s*(?=\()/g, '.<span class="text-green-400">$1</span>');
    
    // 6. Highlight operators and punctuation
    highlightedText = highlightedText.replace(/(=&gt;|=|==|!=|<=|>=|\+=|-=|\*=|\|=|\+|-|\*|\/|%)/g, '<span class="text-red-400">$1</span>');

    return { __html: highlightedText };
  };

  return (
    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-loose">
      <code dangerouslySetInnerHTML={highlightSyntax(content)} />
    </pre>
  );
};

export default CodeBlock;