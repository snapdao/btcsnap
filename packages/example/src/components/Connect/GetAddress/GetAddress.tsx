import React, { useCallback, useState } from 'react';
import { ReactComponent as ConnectIcon } from '../image/connect.svg';
import { ReactComponent as Reveal } from '../image/reveal.svg';
import { getAllExtendedPublicKeys } from '../../../lib/snap';
import { useAppStore } from '../../../mobx';
import { trackGetAddress } from '../../../tracking';
import { register } from '../../../services/CryptoService/register';
import { AppStatus } from '../../../mobx/runtime';
import { observer } from 'mobx-react-lite';
import { ErrorPage } from './ErrorPage';
import { ErrorMessage, ErrorTipsContainer, LoadingContainer, ModalContainer } from './styles';
import { logger } from '../../../logger';
import { SnapError, SnapRequestErrors } from '../../../errors';
import { Caption, Message, MessageType } from '../../../kits';
import { Loader, Modal as SModal } from 'semantic-ui-react';
import '../Modal.css';
import { ModalContentContainer } from '../styles';
import LoadingIcon from '../../Icons/Loading';

export interface GetAddressProps {
  show: boolean;
  onRevealed: () => void;
  onRegister: (isRegistering: boolean) => void;
}

interface ErrorMessage {
  message: string;
  code: number;
}

export const GetAddress = observer(
  ({ show, onRegister, onRevealed }: GetAddressProps) => {
    const {
      settings: { network, scriptType },
      current,
      accounts,
      runtime: { setStatus },
    } = useAppStore();
    const [isRevealing, setIsRevealing] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
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

    const showErrorToast = (message: string) => {
      setErrorMessage(message);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    };

    const handleRegister = useCallback(async (xpubs, mfp) => {
      try {
        setIsRegistering(accounts.length === 0);
        onRegister(true);
        await register(xpubs, mfp);
        onRevealed();
      } catch (e: unknown) {
        setIsRegistering(false);
        logger.error(e);
        showErrorToast('Account init failed, please retry');
        setStatus(AppStatus.Connect);
      } finally {
        onRegister(false);
      }
    }, [accounts]);

    const handleGetAllExtendedPublicKeys = useCallback(async () => {
      try {
        const { mfp, xpubs } = await getAllExtendedPublicKeys();
        if (mfp && xpubs.length > 0) {
          trackGetAddress(network);
          setStatus(AppStatus.Register);
          await handleRegister(xpubs, mfp);
        }
      } catch (err: any) {
        if (expectErrorMessages.includes(err.message)) {
          showErrorToast(err.message);
        } else {
          setFatalErrorMessage(err);
        }
      } finally {
        setIsRevealing(false);
      }
    }, [network, scriptType, current?.xpub, handleRegister]);

    const getXpub = useCallback(async () => {
      setIsRevealing(true);
      await handleGetAllExtendedPublicKeys();
    }, [handleGetAllExtendedPublicKeys]);

    const closeError = () => {
      setFatalErrorMessage({ message: '', code: 0 });
      setStatus(AppStatus.ConnectClosed);
    };

    if (isRegistering) {
      return (
        <ModalContentContainer show={show}>
          <ModalContainer>
            <LoadingContainer>
              <LoadingIcon width={'36px'} height={'36px'} spin color='var(--c-pri50)' />
              <p>
                <Caption>Initializing...</Caption>
                <Caption>It will take about 10 seconds.</Caption>
              </p>
            </LoadingContainer>
          </ModalContainer>
        </ModalContentContainer>
      );
    }

    return (
      <>
        <ModalContentContainer show={show}>
          <ConnectIcon className='Connect-MM-icon' />
          <h2>
            Get Addresses for <br /> Zion
          </h2>
          <p style={{ marginBottom: 82 }} className='Connect-install'>
            Your Bitcoin account addresses will be created along with your
            MetaMask public key.
          </p>
          <button
            className='Connect-button'
            disabled={isRevealing}
            onClick={getXpub}
          >
            <Reveal />
            <span>Get Addresses</span>
          </button>
          <ErrorTipsContainer>
            {
              shouldShowErrorMessage && <Message type={MessageType.Error}>{errorMessage}</Message>
            }
          </ErrorTipsContainer>
        </ModalContentContainer>
        <ErrorPage
          open={!!fatalErrorMessage.message}
          fatalErrorMessage={fatalErrorMessage}
          close={closeError}
        />

        <SModal open={isRevealing}>
          <Loader inverted content={'Continue at MetaMask'} />
        </SModal>
      </>
    );
  },
);
