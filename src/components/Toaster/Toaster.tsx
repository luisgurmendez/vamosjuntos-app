import React from 'react';
import Toast, { ToastMessage, ToastVariant } from './Toast';
import EventManager from './EventManager';
import styled from 'styled-components/native';

const eventManager = new EventManager();

enum ToasterAction {
  SHOW = 'SHOW',
  DISMISS = 'DISMISS'
}

interface ToasterState {
  messages: ToastMessage[];
}

type ToastPropsBase = Omit<ToastMessage, 'id' | 'variant' | 'onDismiss'>;

interface ToasterProps { }

class Toaster extends React.Component<ToasterProps, ToasterState> {
  static mounted = false;
  static queue: any = [];
  static toastId = 0;
  static defaultHideAfter = 10000;

  constructor(props: ToasterProps) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount = () => {
    eventManager.on(ToasterAction.SHOW, this.handleShowMessage).on(ToasterAction.DISMISS, this.handleDismissMessage);

    Toaster.queue.forEach(({ action, params }: { action: any; params: any }) => {
      eventManager.emit(action, params);
    });

    Toaster.mounted = true;
    Toaster.queue = [];
  };

  componentWillUnmount() {
    eventManager.off(ToasterAction.SHOW);
    eventManager.off(ToasterAction.DISMISS);
  }

  handleShowMessage = (messageParams: any) => {
    this.setState((prevState, props) => ({
      messages: [...prevState.messages, messageParams]
    }));
  };

  handleDismissMessage = (id: number) => {
    this.setState((prevState, _props) => ({
      messages: prevState.messages.filter((msg) => msg.id !== id)
    }));
  };

  static queueToast(params: any) {
    if (Toaster.mounted) {
      eventManager.emit(ToasterAction.SHOW, params);
    } else {
      Toaster.queue.push({ action: ToasterAction.SHOW, params });
    }
  }

  static toast(params: ToastPropsBase & { variant: ToastVariant }): number {
    params.hideAfter = params.hideAfter || Toaster.defaultHideAfter;
    const id = Toaster.toastId++;
    Toaster.queueToast({ id, ...params });
    return id;
  }

  public static alert(options: ToastPropsBase | string): number {
    return Toaster.toast({ variant: ToastVariant.ALERT, ...Toaster.getToastParams(options) });
  }

  static success(options: ToastPropsBase | string): number {
    return Toaster.toast({ variant: ToastVariant.SUCCESS, ...Toaster.getToastParams(options) });
  }

  static warn(options: ToastPropsBase | string): number {
    return Toaster.toast({ variant: ToastVariant.WARN, ...Toaster.getToastParams(options) });
  }

  static info(options: ToastPropsBase | string): number {
    return Toaster.toast({ variant: ToastVariant.INFO, ...Toaster.getToastParams(options) });
  }

  static dismiss(id: number): void {
    eventManager.emit(ToasterAction.DISMISS, id);
  }

  private static getToastParams(options: ToastPropsBase | string): ToastPropsBase {
    if (typeof options === 'string') {
      return {
        title: options
      }
    }
    return options
  }

  render() {
    return (
      <ToasterContainer pointerEvents="box-none">
        <>
          {this.state.messages.map((message) => {
            return <Toast key={message.id} {...message} onDismiss={Toaster.dismiss} />;
          })}
        </>
      </ToasterContainer>
    );
  }
}

export default Toaster;

const ToasterContainer = styled.View`
  position: absolute;
  top: 24px;
  bottom: 0px
  left: 0px;
  right: 0px;
  zIndex: 5;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  flex-direction: column;
  padding: 20px;
`;
