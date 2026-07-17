export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GuestCardProps {
  guestId: string;
  guestName: string;
  checked: boolean;
  disabled: boolean;
  onToggle: () => void;
}

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
}

export interface TokenFormProps {
  token: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export interface ActionButtonsProps {
  loading: boolean;
  naoIrei: boolean;
  disabled: boolean;
  onConfirm: () => void;
  onReset: () => void;
}