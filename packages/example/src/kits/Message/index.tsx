import { MessageContainer, MessageContent, MessageCopy } from './styles';
import { useEffect, useState } from 'react';
import { ReactComponent as ErrorIcon } from './images/error.svg';
import { ReactComponent as SucceedIcon } from '../../assets/vector.svg';
import { Transition } from 'semantic-ui-react';

export enum MessageType {
  Error,
  Succeed,
}

interface MessageProps {
  children: string;
  type?: MessageType;
  duration?: number;
  onClose?: () => void;
}

export const Message = ({
  children,
  duration = 1500,
  type = MessageType.Succeed,
  onClose,
}: MessageProps) => {
  const [visible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);
    }
  }, [visible]);

  let messageTypeIcon = null;
  switch (type) {
    case MessageType.Error:
      messageTypeIcon = <ErrorIcon />;
      break;
    case MessageType.Succeed:
      messageTypeIcon = <SucceedIcon />;
      break;
  }

  return (
    <MessageContainer>
      <Transition
        visible={visible}
        animation='fade up'
        duration={200}>
        <MessageContent>
          {messageTypeIcon}
          <MessageCopy type={type}>{children}</MessageCopy>
        </MessageContent>
      </Transition>
    </MessageContainer>
  );
};
