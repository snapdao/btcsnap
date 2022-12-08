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
  duration,
  type = MessageType.Succeed,
  onClose,
}: MessageProps) => {
  const [visible, setIsVisible] = useState<boolean>(true);

  const timeout = !duration ? {
    [MessageType.Succeed]: 1500,
    [MessageType.Error]: 2000,
  }[type] : duration;
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, timeout);
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
