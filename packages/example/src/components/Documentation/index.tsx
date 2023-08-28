import { Background } from '../Background';
import ReactMarkdown from 'react-markdown';
import { DocumentationContainer } from './styles';
import { Docs, Doctype } from './config';
export { Doctype };

interface DocumentationProps {
  type: Doctype
}

export const Documentation = ({ type }: DocumentationProps) => {
  return (
    <Background>
      <DocumentationContainer>
        <ReactMarkdown>
          {Docs[type]}
        </ReactMarkdown>
      </DocumentationContainer>
    </Background>
  );
};
