import * as React from 'react';

declare interface ModalSwipeUpProps extends React.Props<ModalSwipeUp> {
  /**
   * Required prop for modal actual state. Set true if you want to open modal
   */
   showModal: boolean;
  
   /**
   * Required prop to keep panel's state sync with your parent components'state. Will be fired when modal is closed. See the example project.
   */
  onPressClose?: () => void;

  /**
   * Set minimum height for swipe up and close modal
   */
  closeHeight: number;

  /**
   * Fired when the modal is opened
   */
   onOpen?: () => void;

}

declare class ModalSwipeUp extends React.Component<
  ModalSwipeUpProps,
  any
> {}

export { ModalSwipeUp };
