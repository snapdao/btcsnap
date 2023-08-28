import { Background } from '../Background';
import ReactMarkdown from 'react-markdown';
import { DocumentationContainer, Image } from './styles';
import { Docs, Doctype } from './config';
export { Doctype };

interface DocumentationProps {
  type: Doctype
}

export const Documentation = ({ type }: DocumentationProps) => {
  return (
    <Background>
      <DocumentationContainer>
        <ReactMarkdown
          components={{
            img:(props) => <Image {...props} />
          }}
        >
          {Docs[type]}
        </ReactMarkdown>
      </DocumentationContainer>
    </Background>
  );
};
