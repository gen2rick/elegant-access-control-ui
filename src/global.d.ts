
interface Window {
  toast: {
    (props: {
      title: string;
      description?: string;
      action?: React.ReactNode;
      cancel?: React.ReactNode;
    }): void;
  };
}
