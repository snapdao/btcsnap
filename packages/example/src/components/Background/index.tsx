import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStore } from '../../mobx';
import { ApplicationBackground, ApplicationContainer, CookieInfo } from './styles';
import { Loader, Modal, Transition } from 'semantic-ui-react';

interface BackgroundProps {
  children: React.ReactNode
  loading?: boolean
  loadingTip?: React.ReactNode
}

export const Background = observer(({ children, loading = false, loadingTip = '' }: BackgroundProps) => {
  const loadingModalParent = useRef<HTMLDivElement | null>(null);
  const {
    persistDataLoaded,
    user: { isAgreeCookie, agreeCookie },
  } = useAppStore();

  return (
    <>
      <div ref={loadingModalParent}>
        <Modal open={loading} mountNode={loadingModalParent.current}>
          <Loader inverted content={loadingTip} />
        </Modal>
      </div>

      <ApplicationBackground>
        <ApplicationContainer>
          {children}
        </ApplicationContainer>

        {/*  TODO  make cookie visible by removing the false below */}
        <Transition
          visible={!isAgreeCookie && persistDataLoaded && false}
          animation={'fade up'}
          duration={'300'}>
          <CookieInfo>
            <div>
              <p>
                We use cookies to improve the user experience of our product. By
                continuing to use this site, you agree to our Privacy Policy.
              </p>
              <span onClick={agreeCookie}>OK</span>
            </div>
          </CookieInfo>
        </Transition>
      </ApplicationBackground>
    </>
  );
});
