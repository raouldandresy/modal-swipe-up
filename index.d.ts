import * as React from 'react';

declare interface ModalSwipeUpProps extends React.Props<ModalSwipeUp> {
  /**
     * Controls the visibility of the modal.
     */
  showModal: boolean;

  /**
   * Callback executed when the modal is closed.
   */
  onPressClose?: () => void;

  /**
   * Threshold height for swipe-to-close gesture.
   */
  closeHeight: number;

  /**
   * Callback executed when the modal opens.
   */
  onOpen?: () => void;

  /**
   * Content to be displayed inside the modal.
   */
  children: React.ReactNode;
}

declare class ModalSwipeUp extends React.Component<
  ModalSwipeUpProps,
  any
> {}

export { ModalSwipeUp };
