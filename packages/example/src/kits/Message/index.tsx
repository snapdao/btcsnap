import { MessageContainer, MessageContent, MessageCopy } from "./styles";
import { useEffect, useState } from "react";
import { ReactComponent as ErrorIcon } from "./images/error.svg"
import { ReactComponent as SucceedIcon } from '../../assets/vector.svg';

export enum MessageType {
  Error,
  Succeed
}

interface MessageProps {
  children: string;
  type?: MessageType;
  duration?: number
}

export const Message = ({children, duration = 1500, type = MessageType.Succeed}: MessageProps) => {
  const [visible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsVisible(false)
      }, duration)
    }
  }, [visible])

  let messageTypeIcon = null;
  switch (type) {
    case MessageType.Error:
      messageTypeIcon = <ErrorIcon/>;
      break;
    case MessageType.Succeed:
      messageTypeIcon = <SucceedIcon />
      break;
  }

  return visible ? (
    <MessageContainer>
      <MessageContent>
        {messageTypeIcon}
        <MessageCopy>
          {children}
        </MessageCopy>
      </MessageContent>
    </MessageContainer>
  ) : null;
}
