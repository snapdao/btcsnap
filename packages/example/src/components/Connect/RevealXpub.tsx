import React, { useCallback, useState } from 'react';
import { ReactComponent as ConnectIcon } from './image/connect.svg';
import { ReactComponent as Reveal } from './image/reveal.svg';
import Modal from './Modal';
import { getAllExtendedPublicKeys } from '../../lib/snap';
import { useAppStore } from '../../mobx';
import { trackGetAddress } from '../../tracking';
import { register } from '../../services/CryptoService/register';
import { AppStatus } from '../../mobx/runtime';
import { observer } from 'mobx-react-lite';
import ErrorPage from './Error';
import { ErrorMessage } from './styles';
import { SnapRequestErrors } from '../../errors/Snap/errors';
import { logger } from '../../logger';
import { SnapError } from '../../errors';
import LoadingIcon from '../Icons/Loading';
import { Message, MessageType } from '../../kits';
import { StepIndicatorProps } from './StepIndicator';

export interface RevealXpubProps extends StepIndicatorProps {
  open: boolean;
  close: () => void;
  onRevealed: () => void;
  isFirstStep?: boolean;
}

interface ErrorMessage {
  message: string;
  code: number;
}

const RevealXpub = observer(
  ({onRevealed, ...rest }: RevealXpubProps) => {
    const {
      settings: { network, scriptType },
      current,
      runtime: { setStatus },
    } = useAppStore();
    const [isRevealing, setIsRevealing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [fatalErrorMessage, setFatalErrorMessage] = useState<ErrorMessage>({
      message: '',
      code: 0,
    });
    const [shouldShowErrorMessage, setShowErrorMessage] =
      useState<boolean>(false);
    const expectErrorMessages = SnapRequestErrors.filter(
      (item) => item.name === 'RejectKey' || 'UserReject',
    ).map((error) => error.message);

    const getXpub = useCallback(async () => {
      setIsRevealing(true);

      getAllExtendedPublicKeys()
        .then(async ({mfp, xpubs}) => {
          if (mfp && xpubs.length > 0) {
            trackGetAddress(network);
            setStatus(AppStatus.Register);
            try {
              onRevealed();
              await register(xpubs, mfp);
            } catch (e: unknown) {
              logger.error(e);
              setErrorMessage('Account init failed, please retry');
              setStatus(AppStatus.Connect);
            }
          }
          setIsRevealing(false);
        })
        .catch((err: SnapError) => {
          if (expectErrorMessages.includes(err.message)) {
            setErrorMessage(err.message);
            setShowErrorMessage(true);
            setTimeout(() => {
              setShowErrorMessage(false);
            }, 2000);
          } else {
            setFatalErrorMessage(err);
          }
          setIsRevealing(false);
        });
    }, [isRevealing, setIsRevealing, network, scriptType, current?.xpub]);

    const closeError = () => {
      setFatalErrorMessage({ message: '', code: 0 });
      setStatus(AppStatus.ConnectClosed);
    };

    return (
      <>
        <Modal
          isDisabled={isRevealing}
          {...rest}
        >
          <ConnectIcon className='Connect-flask-icon' />
          <h2>
            Get Addresses for <br /> Bitcoin Snap
          </h2>
          <p style={{ marginBottom: 100 }} className='Connect-install'>
            Your Bitcoin account addresses will be created along with your
            MetaMask public key.
          </p>
          <button
            className='Connect-button'
            disabled={isRevealing}
            onClick={getXpub}>
            {isRevealing ? (
              <>
                <LoadingIcon spin />
              </>
            ) : (
              <>
                <Reveal />
                <span>Get Addresses</span>
              </>
            )}
          </button>
          <>
            {
              shouldShowErrorMessage && <Message type={MessageType.Error}>{errorMessage}</Message>
            }
          </>
        </Modal>

        <ErrorPage
          open={!!fatalErrorMessage.message}
          fatalErrorMessage={fatalErrorMessage}
          close={closeError}
        />
      </>
    );
  },
);

export default RevealXpub;
